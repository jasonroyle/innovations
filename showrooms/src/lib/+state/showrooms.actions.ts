import { createAction, props } from '@ngrx/store';
import { ShowroomsEntity } from './showrooms.models';

export const initShowrooms = createAction('[Showrooms Page] Init');

export const loadShowroomsSuccess = createAction(
  '[Showrooms/API] Load Showrooms Success',
  props<{ showrooms: ShowroomsEntity[] }>()
);

export const loadShowroomsFailure = createAction(
  '[Showrooms/API] Load Showrooms Failure',
  props<{ error: any }>()
);
