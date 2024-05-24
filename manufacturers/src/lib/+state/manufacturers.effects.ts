import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ManufacturersActions from './manufacturers.actions';
import * as ManufacturersFeature from './manufacturers.reducer';
import { ManufacturersService } from '../services/manufacturers.service';

@Injectable()
export class ManufacturersEffects {
  private actions$ = inject(Actions);
  private _manufacturersService = inject(ManufacturersService);

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

  loadManufacturers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ManufacturersActions.showroomLoadManufacturers),
      switchMap(({ params }) => {
        const manufacturers = this._manufacturersService.loadManufacturers(params);
        return of(ManufacturersActions.loadManufacturersSuccess({ manufacturers }));
      }),
      catchError((error) => {
        console.error('Load Manufacturers Error', error);
        return of(ManufacturersActions.loadManufacturersFailure({ error }));
      })
    )
  );
}
