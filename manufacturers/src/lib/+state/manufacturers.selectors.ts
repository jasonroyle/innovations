import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MANUFACTURERS_FEATURE_KEY,
  ManufacturersState,
  manufacturersAdapter,
} from './manufacturers.reducer';

// Lookup the 'Manufacturers' feature state managed by NgRx
export const selectManufacturersState =
  createFeatureSelector<ManufacturersState>(MANUFACTURERS_FEATURE_KEY);

const { selectAll, selectEntities } = manufacturersAdapter.getSelectors();

export const selectManufacturersLoaded = createSelector(
  selectManufacturersState,
  (state: ManufacturersState) => state.loaded
);

export const selectManufacturersError = createSelector(
  selectManufacturersState,
  (state: ManufacturersState) => state.error
);

export const selectAllManufacturers = createSelector(
  selectManufacturersState,
  (state: ManufacturersState) => selectAll(state)
);

export const selectAllManufacturersSorted = createSelector(
  selectAllManufacturers,
  manufacturers => manufacturers.sort((a, b) => {
    if (a.name === b.name) return 0;
    return a.name < b.name ? -1 : 1;
  }),
);

export const selectManufacturersEntities = createSelector(
  selectManufacturersState,
  (state: ManufacturersState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectManufacturersState,
  (state: ManufacturersState) => state.selectedId
);

export const selectEntity = createSelector(
  selectManufacturersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
