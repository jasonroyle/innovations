import { DispatchProps, TransactionProps } from '@innovations/shared';
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
  props<DispatchProps<{ showroom: ShowroomsEntity }>>()
);

export const addShowroomFailure_addShowroom = createAction(
  '[Add Showroom] Add Showroom Failure',
  props<DispatchProps<{ error: string }>>()
);

export const addShowroomSuccess_addShowroom = createAction(
  '[Add Showroom] Add Showroom Success',
  props<DispatchProps<{ showroom: ShowroomsEntity }>>()
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

export const clearTransaction_addShowroom = createAction(
  '[Add Showroom] Clear Transaction',
  props<TransactionProps>()
);

export const clearCompleteTransactions_addShowroom = createAction(
  '[Add Showroom] Clear Complete Transactions'
);

export const publicActions = {
  addShowroom_addShowroom,
  clearCompleteTransactions_addShowroom,
  searchShowrooms_showroomList,
  selectShowroom_editShowroom,
  selectShowroom_showroomDetail,
  updateShowroom_editShowroom,
};
