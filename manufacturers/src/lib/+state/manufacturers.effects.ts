import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ManufacturersActions from './manufacturers.actions';
import * as ManufacturersFeature from './manufacturers.reducer';

@Injectable()
export class ManufacturersEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ManufacturersActions.initManufacturers),
      switchMap(() =>
        of(ManufacturersActions.loadManufacturersSuccess({ manufacturers: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ManufacturersActions.loadManufacturersFailure({ error }));
      })
    )
  );
}
