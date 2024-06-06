import { Injectable, inject } from '@angular/core';
import { VehiclesFacade } from '@codeweavers/vehicles-api';
import { select } from '@ngrx/store';

import * as VehiclesSelectors from './vehicles-ui.selectors';

@Injectable()
export class VehiclesUiFacade {
  private readonly _vehiclesFacade = inject(VehiclesFacade);

  allVehicleDetails$ = this._vehiclesFacade.store$.pipe(
    select(VehiclesSelectors.selectAllVehicleDetails)
  );
  selectedVehicleDetail$ = this._vehiclesFacade.store$.pipe(
    select(VehiclesSelectors.selectSelectedVehicleDetail)
  );
}
