import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ShowroomsActions from './showrooms.actions';
import * as ShowroomsFeature from './showrooms.reducer';
import * as ShowroomsSelectors from './showrooms.selectors';

@Injectable()
export class ShowroomsFacade {
  private readonly store: Store<ShowroomsFeature.ShowroomsPartialState> =
    inject(Store);
  public readonly actions = ShowroomsActions.publicActions;
  public readonly transactions =
    ShowroomsFeature.showroomsTransactionAdapter.getFacade(
      this.store,
      ShowroomsSelectors.selectShowroomsState
    );

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ShowroomsSelectors.selectShowroomsLoaded));
  allShowrooms$ = this.store.pipe(
    select(ShowroomsSelectors.selectAllShowrooms)
  );
  searchTerm$ = this.store.pipe(select(ShowroomsSelectors.selectSearchTerm));
  selectedShowroom$ = this.store.pipe(select(ShowroomsSelectors.selectEntity));
  store$ = this.store.pipe();

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ShowroomsActions.initShowrooms());
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  selectShowroomById(id: string) {
    return this.store.pipe(select(ShowroomsSelectors.selectEntityById(id)));
  }

  selectShowroomBySlug(slug: string) {
    return this.store.pipe(select(ShowroomsSelectors.selectEntityBySlug(slug)));
  }
}
