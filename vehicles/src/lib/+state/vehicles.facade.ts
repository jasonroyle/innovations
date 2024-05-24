import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as VehiclesActions from './vehicles.actions';
import * as VehiclesFeature from './vehicles.reducer';
import * as VehiclesSelectors from './vehicles.selectors';

@Injectable()
export class VehiclesFacade {
  private readonly store = inject(Store);
  public readonly actions = VehiclesActions.publicActions;

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(VehiclesSelectors.selectVehiclesLoaded));
  allVehicles$ = this.store.pipe(select(VehiclesSelectors.selectAllVehicles));
  allVehiclesWithManufacturers$ = this.store.pipe(select(VehiclesSelectors.selectAllVehiclesWithManufacturers));
  selectedVehicle$ = this.store.pipe(select(VehiclesSelectors.selectEntity));
  selectedVehicleWithManufacturer$ = this.store.pipe(select(VehiclesSelectors.selectEntityWithManufacturer));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(VehiclesActions.initVehicles());
  }

  dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
