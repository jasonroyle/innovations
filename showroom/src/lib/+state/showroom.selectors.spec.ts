import { ShowroomEntity } from './showroom.models';
import {
  showroomAdapter,
  ShowroomPartialState,
  initialShowroomState,
} from './showroom.reducer';
import * as ShowroomSelectors from './showroom.selectors';

describe('Showroom Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getShowroomId = (it: ShowroomEntity) => it.id;
  const createShowroomEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ShowroomEntity);

  let state: ShowroomPartialState;

  beforeEach(() => {
    state = {
      showroom: showroomAdapter.setAll(
        [
          createShowroomEntity('PRODUCT-AAA'),
          createShowroomEntity('PRODUCT-BBB'),
          createShowroomEntity('PRODUCT-CCC'),
        ],
        {
          ...initialShowroomState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Showroom Selectors', () => {
    it('selectAllShowroom() should return the list of Showroom', () => {
      const results = ShowroomSelectors.selectAllShowroom(state);
      const selId = getShowroomId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ShowroomSelectors.selectEntity(state) as ShowroomEntity;
      const selId = getShowroomId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectShowroomLoaded() should return the current "loaded" status', () => {
      const result = ShowroomSelectors.selectShowroomLoaded(state);

      expect(result).toBe(true);
    });

    it('selectShowroomError() should return the current "error" state', () => {
      const result = ShowroomSelectors.selectShowroomError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
