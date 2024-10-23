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

export const selectEntityByRegistrationMark = (registrationMark: string) =>
  createSelector(
    selectVehiclesEntities,
    (vehicles) => vehicles[registrationMark]
  );

export const selectSearchTerm = createSelector(
  selectVehiclesState,
  (state: VehiclesState) => state.searchTerm
);
