import { VehiclesEntity } from './vehicles.models';
import {
  vehiclesAdapter,
  VehiclesPartialState,
  initialVehiclesState,
} from './vehicles.reducer';
import * as VehiclesSelectors from './vehicles.selectors';

describe('Vehicles Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getVehiclesId = (it: VehiclesEntity) => it.id;
  const createVehiclesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as VehiclesEntity);

  let state: VehiclesPartialState;

  beforeEach(() => {
    state = {
      vehicles: vehiclesAdapter.setAll(
        [
          createVehiclesEntity('PRODUCT-AAA'),
          createVehiclesEntity('PRODUCT-BBB'),
          createVehiclesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialVehiclesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Vehicles Selectors', () => {
    it('selectAllVehicles() should return the list of Vehicles', () => {
      const results = VehiclesSelectors.selectAllVehicles(state);
      const selId = getVehiclesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = VehiclesSelectors.selectEntity(state) as VehiclesEntity;
      const selId = getVehiclesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectVehiclesLoaded() should return the current "loaded" status', () => {
      const result = VehiclesSelectors.selectVehiclesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectVehiclesError() should return the current "error" state', () => {
      const result = VehiclesSelectors.selectVehiclesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
