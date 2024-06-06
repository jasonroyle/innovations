import { Injectable, inject } from '@angular/core';
import {
  Actions,
  OnInitEffects,
  concatLatestFrom,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { switchMap, catchError, of } from 'rxjs';

import { VehiclesService } from '../services/vehicles.service';
import * as VehiclesActions from './vehicles.actions';
import * as VehiclesFeature from './vehicles.reducer';
import * as VehiclesSelectors from './vehicles.selectors';

@Injectable()
export class VehiclesEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private _store: Store<VehiclesFeature.VehiclesState> = inject(Store);
  private _vehiclesService = inject(VehiclesService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.initVehicles),
      concatLatestFrom(() =>
        this._store.select(VehiclesSelectors.selectAllVehicles)
      ),
      switchMap(([, vehicles]) => {
        if (!vehicles.length) vehicles = this._vehiclesService.loadVehicles();
        return of(VehiclesActions.loadVehiclesSuccess({ vehicles }));
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(VehiclesActions.loadVehiclesFailure({ error }));
      })
    )
  );

  ngrxOnInitEffects(): Action {
    return VehiclesActions.initVehicles();
  }
}
