import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ManufacturersActions from './manufacturers.actions';
import { ManufacturersEntity } from './manufacturers.models';

export const MANUFACTURERS_FEATURE_KEY = 'manufacturers';

export interface ManufacturersState extends EntityState<ManufacturersEntity> {
  selectedId?: string | number; // which Manufacturers record has been selected
  loaded: boolean; // has the Manufacturers list been loaded
  error?: string | null; // last known error (if any)
}

export interface ManufacturersPartialState {
  readonly [MANUFACTURERS_FEATURE_KEY]: ManufacturersState;
}

export const manufacturersAdapter: EntityAdapter<ManufacturersEntity> =
  createEntityAdapter<ManufacturersEntity>();

export const initialManufacturersState: ManufacturersState =
  manufacturersAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialManufacturersState,
  on(ManufacturersActions.initManufacturers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    ManufacturersActions.loadManufacturersSuccess,
    (state, { manufacturers }) =>
      manufacturersAdapter.setAll(manufacturers, { ...state, loaded: true })
  ),
  on(ManufacturersActions.loadManufacturersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function manufacturersReducer(
  state: ManufacturersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
