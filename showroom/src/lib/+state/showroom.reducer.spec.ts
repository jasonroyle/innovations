import { Action } from '@ngrx/store';

import * as ShowroomActions from './showroom.actions';
import { ShowroomEntity } from './showroom.models';
import {
  ShowroomState,
  initialShowroomState,
  showroomReducer,
} from './showroom.reducer';

describe('Showroom Reducer', () => {
  const createShowroomEntity = (id: string, name = ''): ShowroomEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Showroom actions', () => {
    it('loadShowroomSuccess should return the list of known Showroom', () => {
      const showroom = [
        createShowroomEntity('PRODUCT-AAA'),
        createShowroomEntity('PRODUCT-zzz'),
      ];
      const action = ShowroomActions.loadShowroomSuccess({ showroom });

      const result: ShowroomState = showroomReducer(
        initialShowroomState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = showroomReducer(initialShowroomState, action);

      expect(result).toBe(initialShowroomState);
    });
  });
});
