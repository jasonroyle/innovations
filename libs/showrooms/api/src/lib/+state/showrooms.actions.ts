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

export const addShowroom_addShowroom = createAction(
  '[Add Showroom] Add Showroom',
  props<{ showroom: ShowroomsEntity }>()
);

export const searchShowrooms_showroomList = createAction(
  '[Showroom List] Search Showrooms',
  props<{ searchTerm: string }>()
);

export const selectShowroom_editShowroom = createAction(
  '[Edit Showroom] Select Showroom',
  props<{ id?: string }>()
);

export const selectShowroom_showroomDetail = createAction(
  '[Showroom Detail] Select Showroom',
  props<{ id?: string }>()
);

export const updateShowroom_editShowroom = createAction(
  '[Edit Showroom] Update Showroom',
  props<{ showroom: ShowroomsEntity }>()
);

export const publicActions = {
  addShowroom_addShowroom,
  searchShowrooms_showroomList,
  selectShowroom_editShowroom,
  selectShowroom_showroomDetail,
  updateShowroom_editShowroom,
};
