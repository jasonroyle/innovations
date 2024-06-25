import { StoreHydration } from '@innovations/shared';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MetaReducer, createReducer, on, Action } from '@ngrx/store';

import * as ShowroomsActions from './showrooms.actions';
import { ShowroomsEntity } from './showrooms.models';

export const SHOWROOMS_FEATURE_KEY = 'showrooms';

export interface ShowroomsState extends EntityState<ShowroomsEntity> {
  searchTerm?: string;
  selectedId?: string; // which Showrooms record has been selected
  loaded: boolean; // has the Showrooms list been loaded
  error?: string | null; // last known error (if any)
}

export interface ShowroomsPartialState {
  readonly [SHOWROOMS_FEATURE_KEY]: ShowroomsState;
}

export const showroomsAdapter: EntityAdapter<ShowroomsEntity> =
  createEntityAdapter<ShowroomsEntity>();

export const initialShowroomsState: ShowroomsState =
  showroomsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialShowroomsState,
  on(ShowroomsActions.initShowrooms, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ShowroomsActions.loadShowroomsSuccess, (state, { showrooms }) =>
    showroomsAdapter.setAll(showrooms, { ...state, loaded: true })
  ),
  on(ShowroomsActions.loadShowroomsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ShowroomsActions.addShowroom_addShowroom, (state, { showroom }) =>
    showroomsAdapter.addOne(showroom, { ...state })
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
      showroomsAdapter.updateOne({ id, changes: showroom }, { ...state })
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
