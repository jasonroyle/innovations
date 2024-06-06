import { selectManufacturersEntities } from '@innovations/manufacturers-api';
import {
  selectEntity,
  selectShowroomsEntities,
} from '@innovations/showrooms-api';
import { selectAllVehicles } from '@innovations/vehicles-api';
import { createSelector } from '@ngrx/store';

export const selectSelectedShowroomDetail = createSelector(
  selectEntity,
  selectManufacturersEntities,
  selectAllVehicles,
  (showroom, manufacturers, vehicles) =>
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

export const selectAllVehicleDetails = createSelector(
  selectShowroomsEntities,
  selectManufacturersEntities,
  selectAllVehicles,
  (showrooms, manufacturers, vehicles) =>
    vehicles.map((vehicle) => ({
      manufacturer: manufacturers[vehicle.manufacturerId],
      showroom: vehicle.showroomId ? showrooms[vehicle.showroomId] : undefined,
      vehicle,
    }))
);

export const selectVehicleDetailsWithoutShowroom = createSelector(
  selectAllVehicleDetails,
  (vehicles) => vehicles.filter((vehicle) => !!vehicle.showroom)
);

export const selectVehicleDetailsWithoutShowroomByManufacturerId = (
  manufacturerId: string
) =>
  createSelector(selectVehicleDetailsWithoutShowroom, (vehicles) =>
    vehicles.filter((vehicle) => vehicle.manufacturer?.id === manufacturerId)
  );
