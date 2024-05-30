import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { ManufacturersService } from '../services/manufacturers.service';
import * as ManufacturersActions from './manufacturers.actions';
import { ManufacturersEffects } from './manufacturers.effects';
import { ManufacturersFacade } from './manufacturers.facade';
import { ManufacturersEntity } from './manufacturers.models';
import {
  MANUFACTURERS_FEATURE_KEY,
  ManufacturersState,
  initialManufacturersState,
  manufacturersReducer,
} from './manufacturers.reducer';
import * as ManufacturersSelectors from './manufacturers.selectors';

interface TestSchema {
  manufacturers: ManufacturersState;
}

describe('ManufacturersFacade', () => {
  let facade: ManufacturersFacade;
  let store: Store<TestSchema>;
  const createManufacturersEntity = (
    id: string,
    name = ''
  ): ManufacturersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            MANUFACTURERS_FEATURE_KEY,
            manufacturersReducer
          ),
          EffectsModule.forFeature([ManufacturersEffects]),
        ],
        providers: [ManufacturersFacade, ManufacturersService],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ManufacturersFacade);
    });

    it('ngrxOnInitEffects() should populate manufacturers and set loaded == true', async () => {
      const list = await firstValueFrom(facade.allManufacturers$);
      const isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(5);
      expect(isLoaded).toBe(true);
    })

    /**
     * Use `loadManufacturersSuccess` to manually update list
     */
    it('allManufacturers$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allManufacturers$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(5);
      expect(isLoaded).toBe(true);

      store.dispatch(
        ManufacturersActions.loadManufacturersSuccess({
          manufacturers: [
            createManufacturersEntity('AAA'),
            createManufacturersEntity('BBB'),
          ],
        })
      );

      list = await firstValueFrom(facade.allManufacturers$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
