import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as VehiclesActions from './vehicles.actions';
import { VehiclesEntity } from './vehicles.models';

export const VEHICLES_FEATURE_KEY = 'vehicles';

export interface VehiclesState extends EntityState<VehiclesEntity> {
  selectedId?: string | number; // which Vehicles record has been selected
  loaded: boolean; // has the Vehicles list been loaded
  error?: string | null; // last known error (if any)
}

export interface VehiclesPartialState {
  readonly [VEHICLES_FEATURE_KEY]: VehiclesState;
}

export const vehiclesAdapter: EntityAdapter<VehiclesEntity> =
  createEntityAdapter<VehiclesEntity>();

export const initialVehiclesState: VehiclesState =
  vehiclesAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialVehiclesState,
  on(VehiclesActions.initVehicles, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(VehiclesActions.loadVehiclesSuccess, (state, { vehicles }) =>
    vehiclesAdapter.setAll(vehicles, { ...state, loaded: true })
  ),
  on(VehiclesActions.loadVehiclesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function vehiclesReducer(
  state: VehiclesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
