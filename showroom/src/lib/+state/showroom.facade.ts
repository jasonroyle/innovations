import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ShowroomActions from './showroom.actions';
import * as ShowroomFeature from './showroom.reducer';
import * as ShowroomSelectors from './showroom.selectors';

@Injectable()
export class ShowroomFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ShowroomSelectors.selectShowroomLoaded));
  allShowroom$ = this.store.pipe(select(ShowroomSelectors.selectAllShowroom));
  selectedShowroom$ = this.store.pipe(select(ShowroomSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ShowroomActions.initShowroom());
  }
}
