import { selectManufacturersEntities } from '@innovations/manufacturers-api';
import {
  selectAllShowrooms,
  selectEntity,
  selectShowroomsEntities,
} from '@innovations/showrooms-api';
import { selectAllVehicles } from '@innovations/vehicles-api';
import { createSelector } from '@ngrx/store';

import { ShowroomDetail, VehicleDetail } from './showrooms-ui.models';

export const selectAllShowroomDetails = createSelector(
  selectAllShowrooms,
  selectManufacturersEntities,
  selectAllVehicles,
  (showrooms, manufacturers, vehicles): ShowroomDetail[] =>
    showrooms.map((showroom) => ({
      manufacturer: showroom.manufacturerId
        ? manufacturers[showroom.manufacturerId]
        : undefined,
      showroom,
      vehicleDetails: vehicles
        .filter((vehicle) => vehicle.showroomId === showroom.id)
        .map((vehicle) => ({
          manufacturer: manufacturers[vehicle.manufacturerId],
          vehicle,
        })),
    }))
);

export const selectAllVehicleDetails = createSelector(
  selectShowroomsEntities,
  selectManufacturersEntities,
  selectAllVehicles,
  (showrooms, manufacturers, vehicles): VehicleDetail[] =>
    vehicles.map((vehicle) => ({
      manufacturer: manufacturers[vehicle.manufacturerId],
      showroom: vehicle.showroomId ? showrooms[vehicle.showroomId] : undefined,
      vehicle,
    }))
);

export const selectSelectedShowroomDetail = createSelector(
  selectEntity,
  selectManufacturersEntities,
  selectAllVehicles,
  (showroom, manufacturers, vehicles): ShowroomDetail | undefined =>
    showroom
      ? {
          showroom,
          manufacturer: showroom.manufacturerId
            ? manufacturers[showroom.manufacturerId]
            : undefined,
          vehicleDetails: vehicles
            .filter((vehicle) => vehicle.showroomId === showroom.id)
            .map((vehicle) => ({
              manufacturer: manufacturers[vehicle.manufacturerId],
              vehicle,
            })),
        }
      : undefined
);

export const selectSelectedShowroomVehicleDetails = createSelector(
  selectSelectedShowroomDetail,
  (showroomDetail) => showroomDetail?.vehicleDetails
);

export const selectVehicleDetailsWithoutShowroom = createSelector(
  selectAllVehicleDetails,
  (vehicles): VehicleDetail[] => vehicles.filter((vehicle) => !vehicle.showroom)
);

export const selectVehicleDetailsWithoutShowroomByManufacturerId = (
  manufacturerId: string
) =>
  createSelector(
    selectVehicleDetailsWithoutShowroom,
    (vehicles): VehicleDetail[] =>
      vehicles.filter((vehicle) => vehicle.manufacturer?.id === manufacturerId)
  );
