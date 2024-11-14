import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, of, switchMap } from 'rxjs';

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

  createShowroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowroomsActions.addShowroom_addShowroom),
      mergeMap(({ showroom, transaction }) =>
        of(
          ShowroomsActions.addShowroomSuccess_addShowroom({
            showroom,
            transaction,
          })
        ).pipe(
          catchError((error) => {
            console.error('Error', error);
            return of(
              ShowroomsActions.addShowroomFailure_addShowroom({
                error: String(error),
                transaction,
              })
            );
          })
        )
      )
    )
  );
}
