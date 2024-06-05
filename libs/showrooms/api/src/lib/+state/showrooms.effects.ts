import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ShowroomsActions from './showrooms.actions';
import * as ShowroomsFeature from './showrooms.reducer';

@Injectable()
export class ShowroomsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowroomsActions.initShowrooms),
      switchMap(() =>
        of(ShowroomsActions.loadShowroomsSuccess({ showrooms: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ShowroomsActions.loadShowroomsFailure({ error }));
      })
    )
  );
}
