import { Injectable, inject } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, catchError, of } from 'rxjs';

import * as ManufacturersActions from './manufacturers.actions';
import * as ManufacturersFeature from './manufacturers.reducer';
import { ManufacturersService } from '../services/manufacturers.service';

@Injectable()
export class ManufacturersEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private _manufacturersService = inject(ManufacturersService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ManufacturersActions.initManufacturers),
      switchMap(() => {
        const manufacturers = this._manufacturersService.loadManufacturers();
        return of(
          ManufacturersActions.loadManufacturersSuccess({ manufacturers })
        );
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ManufacturersActions.loadManufacturersFailure({ error }));
      })
    )
  );

  ngrxOnInitEffects(): Action {
    return ManufacturersActions.initManufacturers();
  }
}
