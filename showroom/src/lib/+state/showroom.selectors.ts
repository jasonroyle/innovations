import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SHOWROOM_FEATURE_KEY,
  ShowroomState,
  showroomAdapter,
} from './showroom.reducer';

// Lookup the 'Showroom' feature state managed by NgRx
export const selectShowroomState =
  createFeatureSelector<ShowroomState>(SHOWROOM_FEATURE_KEY);

const { selectAll, selectEntities } = showroomAdapter.getSelectors();

export const selectShowroomLoaded = createSelector(
  selectShowroomState,
  (state: ShowroomState) => state.loaded
);

export const selectShowroomError = createSelector(
  selectShowroomState,
  (state: ShowroomState) => state.error
);

export const selectAllShowroom = createSelector(
  selectShowroomState,
  (state: ShowroomState) => selectAll(state)
);

export const selectShowroomEntities = createSelector(
  selectShowroomState,
  (state: ShowroomState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectShowroomState,
  (state: ShowroomState) => state.selectedId
);

export const selectEntity = createSelector(
  selectShowroomEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
