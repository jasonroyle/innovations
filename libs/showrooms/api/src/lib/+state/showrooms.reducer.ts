import {
  StoreHydration,
  TransactionsState,
  createTransactionAdapter,
} from '@innovations/shared';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MetaReducer, createReducer, on, Action } from '@ngrx/store';

import * as ShowroomsActions from './showrooms.actions';
import { ShowroomsEntity } from './showrooms.models';

export const SHOWROOMS_FEATURE_KEY = 'showrooms';

export interface SuccessFeedback {
  showroom: ShowroomsEntity;
}

export type FailureFeedback = string;

export interface ShowroomsState
  extends EntityState<ShowroomsEntity>,
    TransactionsState<SuccessFeedback, FailureFeedback> {
  searchTerm?: string;
  selectedId?: string; // which Showrooms record has been selected
  loaded: boolean; // has the Showrooms list been loaded
  error?: string | null; // last known error (if any)
}

export interface ShowroomsPartialState {
  readonly [SHOWROOMS_FEATURE_KEY]: ShowroomsState;
}

export const showroomsEntityAdapter: EntityAdapter<ShowroomsEntity> =
  createEntityAdapter<ShowroomsEntity>();

export const showroomsTransactionAdapter = createTransactionAdapter<
  SuccessFeedback,
  FailureFeedback
>();

export const initialShowroomsState: ShowroomsState = {
  loaded: false,
  ...showroomsEntityAdapter.getInitialState(),
  ...showroomsTransactionAdapter.getInitialState(),
};

const reducer = createReducer(
  initialShowroomsState,
  on(ShowroomsActions.initShowrooms, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ShowroomsActions.loadShowroomsSuccess, (state, { showrooms }) =>
    showroomsEntityAdapter.setAll(showrooms, { ...state, loaded: true })
  ),
  on(ShowroomsActions.loadShowroomsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ShowroomsActions.addShowroom_addShowroom, (state, { transaction }) =>
    showroomsTransactionAdapter.pending(transaction, state)
  ),
  on(
    ShowroomsActions.addShowroomFailure_addShowroom,
    (state, { error, transaction }) =>
      showroomsTransactionAdapter.failed(transaction, error, state)
  ),
  on(
    ShowroomsActions.addShowroomSuccess_addShowroom,
    (state, { showroom, transaction }) => {
      state = showroomsEntityAdapter.addOne(showroom, state);
      return showroomsTransactionAdapter.success(
        transaction,
        { showroom },
        state
      );
    }
  ),
  on(
    ShowroomsActions.searchShowrooms_showroomList,
    (state, { searchTerm }) => ({ ...state, searchTerm })
  ),
  on(
    ShowroomsActions.selectShowroom_editShowroom,
    ShowroomsActions.selectShowroom_showroomDetail,
    (state, { id }) => ({
      ...state,
      selectedId: id,
    })
  ),
  on(
    ShowroomsActions.updateShowroom_editShowroom,
    (state, { showroom: { id, ...showroom } }) =>
      showroomsEntityAdapter.updateOne({ id, changes: showroom }, { ...state })
  ),
  on(ShowroomsActions.clearTransaction_addShowroom, (state, { transaction }) =>
    showroomsTransactionAdapter.clear(transaction, state)
  ),
  on(ShowroomsActions.clearCompleteTransactions_addShowroom, (state) =>
    showroomsTransactionAdapter.clearComplete(state)
  )
);

export function showroomsReducer(
  state: ShowroomsState | undefined,
  action: Action
) {
  return reducer(state, action);
}

export const showroomsMetaReducers: MetaReducer[] = [
  new StoreHydration().createReducer,
];
