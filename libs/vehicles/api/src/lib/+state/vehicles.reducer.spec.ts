import { Action } from '@ngrx/store';

import * as VehiclesActions from './vehicles.actions';
import { VehiclesEntity } from './vehicles.models';
import {
  VehiclesState,
  initialVehiclesState,
  vehiclesReducer,
} from './vehicles.reducer';

describe('Vehicles Reducer', () => {
  const createVehiclesEntity = (id: string, name = ''): VehiclesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Vehicles actions', () => {
    it('loadVehiclesSuccess should return the list of known Vehicles', () => {
      const vehicles = [
        createVehiclesEntity('PRODUCT-AAA'),
        createVehiclesEntity('PRODUCT-zzz'),
      ];
      const action = VehiclesActions.loadVehiclesSuccess({ vehicles });

      const result: VehiclesState = vehiclesReducer(
        initialVehiclesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = vehiclesReducer(initialVehiclesState, action);

      expect(result).toBe(initialVehiclesState);
    });
  });
});
