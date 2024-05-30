import { Action } from '@ngrx/store';

import * as ManufacturersActions from './manufacturers.actions';
import { ManufacturersEntity } from './manufacturers.models';
import {
  ManufacturersState,
  initialManufacturersState,
  manufacturersReducer,
} from './manufacturers.reducer';

describe('Manufacturers Reducer', () => {
  const createManufacturersEntity = (
    id: string,
    name = ''
  ): ManufacturersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Manufacturers actions', () => {
    it('loadManufacturersSuccess should return the list of known Manufacturers', () => {
      const manufacturers = [
        createManufacturersEntity('PRODUCT-AAA'),
        createManufacturersEntity('PRODUCT-zzz'),
      ];
      const action = ManufacturersActions.loadManufacturersSuccess({
        manufacturers,
      });

      const result: ManufacturersState = manufacturersReducer(
        initialManufacturersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });

    it('loadManufacturersFailure should return an error', () => {
      const error  = 'Oh no!';
      const action = ManufacturersActions.loadManufacturersFailure({
        error
      });

      const result: ManufacturersState = manufacturersReducer(
        initialManufacturersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.error).toBe(error);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = manufacturersReducer(initialManufacturersState, action);

      expect(result).toBe(initialManufacturersState);
    });
  });
});
