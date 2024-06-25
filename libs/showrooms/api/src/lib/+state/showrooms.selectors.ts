import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  SHOWROOMS_FEATURE_KEY,
  ShowroomsState,
  showroomsAdapter,
} from './showrooms.reducer';

// Lookup the 'Showrooms' feature state managed by NgRx
export const selectShowroomsState = createFeatureSelector<ShowroomsState>(
  SHOWROOMS_FEATURE_KEY
);

const { selectAll, selectEntities } = showroomsAdapter.getSelectors();

export const selectShowroomsLoaded = createSelector(
  selectShowroomsState,
  (state: ShowroomsState) => state.loaded
);

export const selectShowroomsError = createSelector(
  selectShowroomsState,
  (state: ShowroomsState) => state.error
);

export const selectAllShowrooms = createSelector(
  selectShowroomsState,
  (state: ShowroomsState) => selectAll(state)
);

export const selectSearchTerm = createSelector(
  selectShowroomsState,
  (state: ShowroomsState) => state.searchTerm
);

export const selectShowroomsEntities = createSelector(
  selectShowroomsState,
  (state: ShowroomsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectShowroomsState,
  (state: ShowroomsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectShowroomsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectEntityById = (id: string) =>
  createSelector(selectShowroomsEntities, (showrooms) => showrooms[id]);

export const selectEntityBySlug = (slug: string) =>
  createSelector(selectAllShowrooms, (showrooms) =>
    showrooms.find((showroom) => showroom.slug === slug)
  );
