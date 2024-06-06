import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as VehiclesActions from './vehicles.actions';
import * as VehiclesFeature from './vehicles.reducer';
import * as VehiclesSelectors from './vehicles.selectors';

@Injectable()
export class VehiclesFacade {
  private readonly store: Store<VehiclesFeature.VehiclesPartialState> =
    inject(Store);
  public readonly actions = VehiclesActions.publicActions;

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(VehiclesSelectors.selectVehiclesLoaded));
  allVehicles$ = this.store.pipe(select(VehiclesSelectors.selectAllVehicles));
  selectedVehicle$ = this.store.pipe(select(VehiclesSelectors.selectEntity));
  store$ = this.store.pipe();

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

  selectVehicleByRegistrationNumber(id: string) {
    return this.store.pipe(
      select(VehiclesSelectors.selectEntityByRegistrationNumber(id))
    );
  }
}
