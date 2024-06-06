import { selectManufacturersEntities } from '@codeweavers/manufacturers-api';
import { selectShowroomsEntities } from '@codeweavers/showrooms-api';
import { selectAllVehicles, selectEntity } from '@codeweavers/vehicles-api';
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
