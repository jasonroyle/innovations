import { createAction, props } from '@ngrx/store';
import { VehiclesEntity } from './vehicles.models';
import { LoadVehicleParams } from '../models/load-vehicles-params';

export const initVehicles = createAction('[Vehicles Page] Init');

export const vehicleListLoadVehicles = createAction(
  '[Vehicles List] Load Vehicles',
  props<{ params: LoadVehicleParams }>()
);

export const loadVehiclesSuccess = createAction(
  '[Vehicles/API] Load Vehicles Success',
  props<{ vehicles: VehiclesEntity[] }>()
);

export const loadVehiclesFailure = createAction(
  '[Vehicles/API] Load Vehicles Failure',
  props<{ error: any }>()
);

export const publicActions = {
  vehicleListLoadVehicles
};
