import { selectManufacturersEntities } from '@codeweavers/manufacturers';
import { selectVehiclesEntities, Vehicle } from '@codeweavers/vehicles';
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

export const selectEntityDetail = createSelector(
  selectEntity,
  selectManufacturersEntities,
  selectVehiclesEntities,
  (showroom, manufacturers, vehicles) => ({
    showroom,
    manufacturer: showroom?.manufacturerId ? manufacturers[showroom.manufacturerId] : undefined,
    vehicles: (showroom?.vehicleIds.map(id => vehicles[id]) ?? []) as Vehicle[]
  })
);

export const selectEntityBySlug = (slug: string) => createSelector(
  selectAllShowrooms,
  (showrooms) => showrooms.find(showroom => showroom.slug === slug)
);
