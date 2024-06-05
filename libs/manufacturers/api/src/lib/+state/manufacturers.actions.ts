import { createAction, props } from '@ngrx/store';
import { ManufacturersEntity } from './manufacturers.models';

export const initManufacturers = createAction('[Manufacturers Page] Init');

export const loadManufacturersSuccess = createAction(
  '[Manufacturers/API] Load Manufacturers Success',
  props<{ manufacturers: ManufacturersEntity[] }>()
);

export const loadManufacturersFailure = createAction(
  '[Manufacturers/API] Load Manufacturers Failure',
  props<{ error: any }>()
);
