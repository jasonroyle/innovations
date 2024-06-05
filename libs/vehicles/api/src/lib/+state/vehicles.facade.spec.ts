import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as VehiclesActions from './vehicles.actions';
import { VehiclesEffects } from './vehicles.effects';
import { VehiclesFacade } from './vehicles.facade';
import { VehiclesEntity } from './vehicles.models';
import {
  VEHICLES_FEATURE_KEY,
  VehiclesState,
  initialVehiclesState,
  vehiclesReducer,
} from './vehicles.reducer';
import * as VehiclesSelectors from './vehicles.selectors';

interface TestSchema {
  vehicles: VehiclesState;
}

describe('VehiclesFacade', () => {
  let facade: VehiclesFacade;
  let store: Store<TestSchema>;
  const createVehiclesEntity = (id: string, name = ''): VehiclesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(VEHICLES_FEATURE_KEY, vehiclesReducer),
          EffectsModule.forFeature([VehiclesEffects]),
        ],
        providers: [VehiclesFacade],
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
      facade = TestBed.inject(VehiclesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allVehicles$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allVehicles$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadVehiclesSuccess` to manually update list
     */
    it('allVehicles$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allVehicles$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        VehiclesActions.loadVehiclesSuccess({
          vehicles: [createVehiclesEntity('AAA'), createVehiclesEntity('BBB')],
        })
      );

      list = await readFirst(facade.allVehicles$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
