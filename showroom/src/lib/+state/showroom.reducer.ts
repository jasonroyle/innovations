import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ShowroomActions from './showroom.actions';
import { ShowroomEntity } from './showroom.models';

export const SHOWROOM_FEATURE_KEY = 'showroom';

export interface ShowroomState extends EntityState<ShowroomEntity> {
  selectedId?: string | number; // which Showroom record has been selected
  loaded: boolean; // has the Showroom list been loaded
  error?: string | null; // last known error (if any)
}

export interface ShowroomPartialState {
  readonly [SHOWROOM_FEATURE_KEY]: ShowroomState;
}

export const showroomAdapter: EntityAdapter<ShowroomEntity> =
  createEntityAdapter<ShowroomEntity>();

export const initialShowroomState: ShowroomState =
  showroomAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialShowroomState,
  on(ShowroomActions.initShowroom, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ShowroomActions.loadShowroomSuccess, (state, { showroom }) =>
    showroomAdapter.setAll(showroom, { ...state, loaded: true })
  ),
  on(ShowroomActions.loadShowroomFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function showroomReducer(
  state: ShowroomState | undefined,
  action: Action
) {
  return reducer(state, action);
}
