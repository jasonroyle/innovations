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

export const selectAllVehicleDetails = createSelector(
  selectAllVehicles,
  selectManufacturersEntities,
  (vehicles, manufacturers) =>
    vehicles.map(vehicle => ({
      vehicle,
      manufacturer: manufacturers[vehicle.manufacturerId]
    }))
);

export const selectVehicleDetailsByManufacturerId = (manufacturerId: string) => createSelector(
  selectAllVehicleDetails,
  vehicles => vehicles.filter(({ vehicle }) => vehicle.manufacturerId === manufacturerId)
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

export const selectEntityDetail = createSelector(
  selectEntity,
  selectManufacturersEntities,
  (vehicle, manufacturers) => ({
    vehicle,
    manufacturer: vehicle ? manufacturers[vehicle.manufacturerId] : undefined
  })
);

export const selectEntityByRegistrationNumber = (registrationNumber: string) => createSelector(
  selectVehiclesEntities,
  vehicles => vehicles[registrationNumber]
);
