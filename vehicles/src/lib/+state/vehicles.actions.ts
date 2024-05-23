import { createAction, props } from '@ngrx/store';
import { VehiclesEntity } from './vehicles.models';

export const initVehicles = createAction('[Vehicles Page] Init');

export const loadVehiclesSuccess = createAction(
  '[Vehicles/API] Load Vehicles Success',
  props<{ vehicles: VehiclesEntity[] }>()
);

export const loadVehiclesFailure = createAction(
  '[Vehicles/API] Load Vehicles Failure',
  props<{ error: any }>()
);
