import { ManufacturersEntity } from '@codeweavers/manufacturers-api';

import { Vehicle } from '../models/vehicle';

export type VehiclesEntity = Vehicle;

export interface VehicleDetail {
  manufacturer?: ManufacturersEntity;
  vehicle: VehiclesEntity;
}
