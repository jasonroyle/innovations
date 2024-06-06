import { ShowroomsEntity } from './showrooms.models';
import {
  showroomsAdapter,
  ShowroomsPartialState,
  initialShowroomsState,
} from './showrooms.reducer';
import * as ShowroomsSelectors from './showrooms.selectors';

describe('Showrooms Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getShowroomsId = (it: ShowroomsEntity) => it.id;
  const createShowroomsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ShowroomsEntity);

  let state: ShowroomsPartialState;

  beforeEach(() => {
    state = {
      showrooms: showroomsAdapter.setAll(
        [
          createShowroomsEntity('PRODUCT-AAA'),
          createShowroomsEntity('PRODUCT-BBB'),
          createShowroomsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialShowroomsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Showrooms Selectors', () => {
    it('selectAllShowrooms() should return the list of Showrooms', () => {
      const results = ShowroomsSelectors.selectAllShowrooms(state);
      const selId = getShowroomsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ShowroomsSelectors.selectEntity(state) as ShowroomsEntity;
      const selId = getShowroomsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectShowroomsLoaded() should return the current "loaded" status', () => {
      const result = ShowroomsSelectors.selectShowroomsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectShowroomsError() should return the current "error" state', () => {
      const result = ShowroomsSelectors.selectShowroomsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
