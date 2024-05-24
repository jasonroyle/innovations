import { createAction, props } from '@ngrx/store';
import { ShowroomEntity } from './showroom.models';

export const initShowroom = createAction('[Showroom Page] Init');

export const loadShowroomSuccess = createAction(
  '[Showroom/API] Load Showroom Success',
  props<{ showroom: ShowroomEntity[] }>()
);

export const loadShowroomFailure = createAction(
  '[Showroom/API] Load Showroom Failure',
  props<{ error: any }>()
);
