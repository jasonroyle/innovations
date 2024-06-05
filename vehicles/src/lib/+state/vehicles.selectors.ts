import {
  ManufacturersEntity,
  selectManufacturersEntities,
} from '@codeweavers/manufacturers';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VehicleDetail, VehiclesEntity } from './vehicles.models';
import {
  VEHICLES_FEATURE_KEY,
  VehiclesState,
  vehiclesAdapter,
} from './vehicles.reducer';

const vehicleDetail = ({
  manufacturers,
  vehicle,
}: {
  manufacturers?: Dictionary<ManufacturersEntity>;
  vehicle: VehiclesEntity;
}): VehicleDetail => ({
  manufacturer: manufacturers?.[vehicle.manufacturerId],
  vehicle,
});

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
    vehicles.map((vehicle) => vehicleDetail({ manufacturers, vehicle }))
);

export const selectAllVehicleDetailsWithoutShowroom = createSelector(
  selectAllVehicleDetails,
  (vehicleDetails) =>
    vehicleDetails.filter(({ vehicle }) => !vehicle.showroomId)
);

export const selectAllVehicleDetailsWithoutShowroomByManufacturerId = (
  manufacturerId: string
) =>
  createSelector(selectAllVehicleDetailsWithoutShowroom, (vehicleDetails) =>
    vehicleDetails.filter(
      ({ manufacturer }) => manufacturer?.id === manufacturerId
    )
  );

export const selectVehicleDetailsByManufacturerId = (manufacturerId: string) =>
  createSelector(selectAllVehicleDetails, (vehicles) =>
    vehicles.filter(({ vehicle }) => vehicle.manufacturerId === manufacturerId)
  );

export const selectVehicleDetailsByShowroomId = (showroomId: string) =>
  createSelector(selectAllVehicleDetails, (vehicles) =>
    vehicles.filter(({ vehicle }) => vehicle.showroomId === showroomId)
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
  (vehicle, manufacturers): VehicleDetail | undefined =>
    vehicle ? vehicleDetail({ manufacturers, vehicle }) : undefined
);

export const selectEntityByRegistrationNumber = (registrationNumber: string) =>
  createSelector(
    selectVehiclesEntities,
    (vehicles) => vehicles[registrationNumber]
  );
