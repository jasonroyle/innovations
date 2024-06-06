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

export const selectVehicle_vehicleList = createAction(
  '[Vehicle List] Select Vehicle',
  props<{ registrationNumber?: string }>()
);

export const linkShowroom_showroomAddVehicle = createAction(
  '[Showroom Add Vehicle] Link Showroom',
  props<{ registrationNumber: string; showroomId?: string }>()
);

export const publicActions = {
  linkShowroom_showroomAddVehicle,
  selectVehicle_vehicleList,
};
