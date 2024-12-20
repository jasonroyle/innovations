import { StoreHydration } from '@innovations/shared';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MetaReducer, createReducer, on, Action } from '@ngrx/store';

import * as VehiclesActions from './vehicles.actions';
import { VehiclesEntity } from './vehicles.models';

export const VEHICLES_FEATURE_KEY = 'vehicles';

export interface VehiclesState extends EntityState<VehiclesEntity> {
  searchTerm?: string;
  selectedId?: string; // which Vehicles record has been selected
  loaded: boolean; // has the Vehicles list been loaded
  error?: string | null; // last known error (if any)
}

export interface VehiclesPartialState {
  readonly [VEHICLES_FEATURE_KEY]: VehiclesState;
}

export const vehiclesAdapter: EntityAdapter<VehiclesEntity> =
  createEntityAdapter<VehiclesEntity>({
    selectId: ({ registrationMark }) => registrationMark,
  });

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
    vehiclesAdapter.upsertMany(vehicles, { ...state, loaded: true })
  ),
  on(VehiclesActions.loadVehiclesFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
  })),
  on(
    VehiclesActions.selectVehicle_vehicleList,
    (state, { registrationMark }) => ({
      ...state,
      selectedId: registrationMark,
    })
  ),
  on(
    VehiclesActions.linkShowroom_showroomAddVehicle,
    VehiclesActions.linkShowroom_showroomVehicleList,
    (state, { registrationMark, showroomId }) =>
      vehiclesAdapter.mapOne(
        {
          id: registrationMark,
          map: (vehicle) => ({ ...vehicle, showroomId }),
        },
        state
      )
  ),
  on(VehiclesActions.searchVehicles_vehicleList, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  }))
);

export function vehiclesReducer(
  state: VehiclesState | undefined,
  action: Action
) {
  return reducer(state, action);
}

export const vehiclesMetaReducers: MetaReducer[] = [
  new StoreHydration().createReducer,
];
