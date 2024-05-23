import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as VehiclesActions from './vehicles.actions';
import * as VehiclesFeature from './vehicles.reducer';

@Injectable()
export class VehiclesEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.initVehicles),
      switchMap(() =>
        of(VehiclesActions.loadVehiclesSuccess({ vehicles: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(VehiclesActions.loadVehiclesFailure({ error }));
      })
    )
  );
}
