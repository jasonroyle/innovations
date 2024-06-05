import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ShowroomsActions from './showrooms.actions';
import * as ShowroomsFeature from './showrooms.reducer';
import * as ShowroomsSelectors from './showrooms.selectors';

@Injectable()
export class ShowroomsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ShowroomsSelectors.selectShowroomsLoaded));
  allShowrooms$ = this.store.pipe(
    select(ShowroomsSelectors.selectAllShowrooms)
  );
  selectedShowrooms$ = this.store.pipe(select(ShowroomsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ShowroomsActions.initShowrooms());
  }
}
