import { selectManufacturersEntities } from '@innovations/manufacturers-api';
import { selectShowroomsEntities } from '@innovations/showrooms-api';
import { selectAllVehicles, selectEntity } from '@innovations/vehicles-api';
import { createSelector } from '@ngrx/store';

import { VehicleDetail } from './vehicles-ui.models';

export const selectAllVehicleDetails = createSelector(
  selectAllVehicles,
  selectManufacturersEntities,
  selectShowroomsEntities,
  (vehicles, manufacturers, showrooms): VehicleDetail[] =>
    vehicles.map((vehicle) => ({
      manufacturer: manufacturers[vehicle.manufacturerId],
      showroom: vehicle.showroomId ? showrooms[vehicle.showroomId] : undefined,
      vehicle,
    }))
);

export const selectSelectedVehicleDetail = createSelector(
  selectEntity,
  selectManufacturersEntities,
  selectShowroomsEntities,
  (vehicle, manufacturers, showrooms): VehicleDetail | undefined =>
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
