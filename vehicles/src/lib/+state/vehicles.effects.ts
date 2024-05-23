import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as VehiclesActions from './vehicles.actions';
import * as VehiclesFeature from './vehicles.reducer';
import { VehiclesService } from '../services/vehicles.service';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Injectable()
export class VehiclesEffects {
  private actions$ = inject(Actions);
  private _vehiclesService = inject(VehiclesService);

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

  loadVehicles = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.vehicleListLoadVehicles),
      switchMap(({ params }) => {
        const vehicles = this._vehiclesService.loadVehicles(params);
        return of(VehiclesActions.loadVehiclesSuccess({ vehicles }));
      }),
      catchError((error) => {
        console.error('Load Vehicles Error', error);
        return of(VehiclesActions.loadVehiclesFailure({ error }));
      })
    )
  );
}
