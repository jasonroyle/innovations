import { selectManufacturersEntities } from '@codeweavers/manufacturers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  VEHICLES_FEATURE_KEY,
  VehiclesState,
  vehiclesAdapter,
} from './vehicles.reducer';

// Lookup the 'Vehicles' feature state managed by NgRx
export const selectVehiclesState =
  createFeatureSelector<VehiclesState>(VEHICLES_FEATURE_KEY);

const { selectAll, selectEntities } = vehiclesAdapter.getSelectors();

export const selectVehiclesLoaded = createSelector(
  selectVehiclesState,
  (state: VehiclesState) => state.loaded
);

export const selectVehiclesError = createSelector(
  selectVehiclesState,
  (state: VehiclesState) => state.error
);

export const selectAllVehicles = createSelector(
  selectVehiclesState,
  (state: VehiclesState) => selectAll(state)
);

export const selectAllVehiclesWithManufacturers = createSelector(
  selectAllVehicles,
  selectManufacturersEntities,
  (vehicles, manufacturers) =>
    vehicles.map(vehicle => ({ ...vehicle, manufacturer: manufacturers[vehicle.manufacturerId] }))
);

export const selectVehiclesEntities = createSelector(
  selectVehiclesState,
  (state: VehiclesState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectVehiclesState,
  (state: VehiclesState) => state.selectedId
);

export const selectEntity = createSelector(
  selectVehiclesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectEntityWithManufacturer = createSelector(
  selectEntity,
  selectManufacturersEntities,
  (vehicle, manufacturers) =>
    vehicle ? { ...vehicle, manufacturer: manufacturers[vehicle.manufacturerId] } : undefined
);
