import { Action } from '@ngrx/store';

import * as ShowroomsActions from './showrooms.actions';
import { ShowroomsEntity } from './showrooms.models';
import {
  ShowroomsState,
  initialShowroomsState,
  showroomsReducer,
} from './showrooms.reducer';

describe('Showrooms Reducer', () => {
  const createShowroomsEntity = (id: string, name = ''): ShowroomsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Showrooms actions', () => {
    it('loadShowroomsSuccess should return the list of known Showrooms', () => {
      const showrooms = [
        createShowroomsEntity('PRODUCT-AAA'),
        createShowroomsEntity('PRODUCT-zzz'),
      ];
      const action = ShowroomsActions.loadShowroomsSuccess({ showrooms });

      const result: ShowroomsState = showroomsReducer(
        initialShowroomsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = showroomsReducer(initialShowroomsState, action);

      expect(result).toBe(initialShowroomsState);
    });
  });
});
