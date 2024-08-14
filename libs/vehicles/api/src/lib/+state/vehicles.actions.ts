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

export const searchVehicles_vehicleList = createAction(
  '[Vehicle List] Search Vehicles',
  props<{ searchTerm: string }>()
);

export const selectVehicle_vehicleList = createAction(
  '[Vehicle List] Select Vehicle',
  props<{ registrationNumber?: string }>()
);

export const linkShowroom_showroomAddVehicle = createAction(
  '[Showroom Add Vehicle] Link Showroom',
  props<{ registrationNumber: string; showroomId?: string }>()
);

export const linkShowroom_showroomVehicleList = createAction(
  '[Showroom Vehicle List] Link Showroom',
  props<{ registrationNumber: string; showroomId?: string }>()
);

export const publicActions = {
  linkShowroom_showroomAddVehicle,
  linkShowroom_showroomVehicleList,
  searchVehicles_vehicleList,
  selectVehicle_vehicleList,
};
