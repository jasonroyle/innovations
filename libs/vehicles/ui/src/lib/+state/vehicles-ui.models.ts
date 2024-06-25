import type { ManufacturersEntity } from '@innovations/manufacturers-api';
import type { ShowroomsEntity } from '@innovations/showrooms-api';
import type { VehiclesEntity } from '@innovations/vehicles-api';

export interface VehicleDetail {
  manufacturer?: ManufacturersEntity;
  showroom?: ShowroomsEntity;
  vehicle: VehiclesEntity;
}
