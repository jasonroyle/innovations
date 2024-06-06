import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

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
        providers: [ManufacturersFacade],
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

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allManufacturers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allManufacturers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadManufacturersSuccess` to manually update list
     */
    it('allManufacturers$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allManufacturers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ManufacturersActions.loadManufacturersSuccess({
          manufacturers: [
            createManufacturersEntity('AAA'),
            createManufacturersEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allManufacturers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
