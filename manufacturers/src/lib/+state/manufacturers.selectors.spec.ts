import { ManufacturersEntity } from './manufacturers.models';
import {
  manufacturersAdapter,
  ManufacturersPartialState,
  initialManufacturersState,
} from './manufacturers.reducer';
import * as ManufacturersSelectors from './manufacturers.selectors';
import { selectAllManufacturersSorted } from './manufacturers.selectors';

describe('Manufacturers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getManufacturersId = (it: ManufacturersEntity) => it.id;
  const createManufacturersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ManufacturersEntity);

  let state: ManufacturersPartialState;

  beforeEach(() => {
    state = {
      manufacturers: manufacturersAdapter.setAll(
        [
          createManufacturersEntity('PRODUCT-CCC', 'CCC'),
          createManufacturersEntity('PRODUCT-BBB', 'BBB'),
          createManufacturersEntity('PRODUCT-AAA', 'AAA'),
        ],
        {
          ...initialManufacturersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Manufacturers Selectors', () => {
    it('selectAllManufacturers() should return the list of Manufacturers', () => {
      const results = ManufacturersSelectors.selectAllManufacturers(state);
      const selId = getManufacturersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ManufacturersSelectors.selectEntity(
        state
      ) as ManufacturersEntity;
      const selId = getManufacturersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectManufacturersLoaded() should return the current "loaded" status', () => {
      const result = ManufacturersSelectors.selectManufacturersLoaded(state);

      expect(result).toBe(true);
    });

    it('selectManufacturersError() should return the current "error" state', () => {
      const result = ManufacturersSelectors.selectManufacturersError(state);

      expect(result).toBe(ERROR_MSG);
    });

    it('selectAllManufacturersSorted() should return the list of manufacturers sorted by name', () => {
      const result = ManufacturersSelectors.selectAllManufacturersSorted(state);

      expect(result.length).toBe(3);
      expect(result[0].name).toBe('AAA');
      expect(result[1].name).toBe('BBB');
      expect(result[2].name).toBe('CCC');
    });
  });
});
