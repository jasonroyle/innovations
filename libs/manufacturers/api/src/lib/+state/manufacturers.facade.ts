import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ManufacturersActions from './manufacturers.actions';
import * as ManufacturersFeature from './manufacturers.reducer';
import * as ManufacturersSelectors from './manufacturers.selectors';

@Injectable()
export class ManufacturersFacade {
  private readonly store: Store<ManufacturersFeature.ManufacturersPartialState> =
    inject(Store);
  public readonly actions = ManufacturersActions;

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(ManufacturersSelectors.selectManufacturersLoaded)
  );
  allManufacturers$ = this.store.pipe(
    select(ManufacturersSelectors.selectAllManufacturersSorted)
  );
  selectedManufacturers$ = this.store.pipe(
    select(ManufacturersSelectors.selectEntity)
  );
  store$ = this.store.pipe();

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ManufacturersActions.initManufacturers());
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
