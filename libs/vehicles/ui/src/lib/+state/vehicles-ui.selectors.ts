import { selectManufacturersEntities } from '@innovations/manufacturers-api';
import { selectShowroomsEntities } from '@innovations/showrooms-api';
import { selectAllVehicles, selectEntity } from '@innovations/vehicles-api';
import { createSelector } from '@ngrx/store';

export const selectSelectedVehicleDetail = createSelector(
  selectEntity,
  selectManufacturersEntities,
  selectShowroomsEntities,
  (vehicle, manufacturers, showrooms) =>
    vehicle
      ? {
          manufacturer: manufacturers[vehicle.manufacturerId],
          showroom: vehicle.showroomId
            ? showrooms[vehicle.showroomId]
            : undefined,
          vehicle,
        }
      : undefined
);

export const selectAllVehicleDetails = createSelector(
  selectAllVehicles,
  selectManufacturersEntities,
  selectShowroomsEntities,
  (vehicles, manufacturers, showrooms) =>
    vehicles.map((vehicle) => ({
      manufacturer: manufacturers[vehicle.manufacturerId],
      showroom: vehicle.showroomId ? showrooms[vehicle.showroomId] : undefined,
      vehicle,
    }))
);
