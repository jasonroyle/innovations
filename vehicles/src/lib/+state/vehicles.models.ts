import { ManufacturersEntity } from '@codeweavers/manufacturers';

import { Vehicle } from '../models/vehicle';

/**
 * Interface for the 'Vehicles' data
 */
export type VehiclesEntity = Vehicle;

export interface VehicleDetail {
  manufacturer?: ManufacturersEntity;
  vehicle: VehiclesEntity;
}
