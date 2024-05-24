import { createAction, props } from '@ngrx/store';
import { ManufacturersEntity } from './manufacturers.models';
import { LoadManufacturersParams } from '../models/load-manufacturers-params';

export const initManufacturers = createAction('[Manufacturers Page] Init');

export const showroomLoadManufacturers = createAction(
  '[Showroom] Load Manufacturers',
  props<{ params: LoadManufacturersParams }>()
);

export const loadManufacturersSuccess = createAction(
  '[Manufacturers/API] Load Manufacturers Success',
  props<{ manufacturers: ManufacturersEntity[] }>()
);

export const loadManufacturersFailure = createAction(
  '[Manufacturers/API] Load Manufacturers Failure',
  props<{ error: any }>()
);

export const publicActions = {
  showroomLoadManufacturers
};
