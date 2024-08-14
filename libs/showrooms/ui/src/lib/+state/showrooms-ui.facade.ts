import { Injectable, inject } from '@angular/core';
import { ShowroomsFacade } from '@innovations/showrooms-api';
import { select } from '@ngrx/store';

import * as ShowroomsSelectors from './showrooms-ui.selectors';

@Injectable()
export class ShowroomsUiFacade {
  private readonly _showroomsFacade = inject(ShowroomsFacade);

  allShowroomDetails$ = this._showroomsFacade.store$.pipe(
    select(ShowroomsSelectors.selectAllShowroomDetails)
  );
  allVehicleDetails$ = this._showroomsFacade.store$.pipe(
    select(ShowroomsSelectors.selectAllVehicleDetails)
  );
  selectedShowroomDetail$ = this._showroomsFacade.store$.pipe(
    select(ShowroomsSelectors.selectSelectedShowroomDetail)
  );
  selectedShowroomVehicleDetails$ = this._showroomsFacade.store$.pipe(
    select(ShowroomsSelectors.selectSelectedShowroomVehicleDetails)
  );
  vehicleDetailsWithoutShowroom$ = this._showroomsFacade.store$.pipe(
    select(ShowroomsSelectors.selectVehicleDetailsWithoutShowroom)
  );

  vehicleDetailsWithoutShowroomByManufacturerId(manufacturerId: string) {
    return this._showroomsFacade.store$.pipe(
      select(
        ShowroomsSelectors.selectVehicleDetailsWithoutShowroomByManufacturerId(
          manufacturerId
        )
      )
    );
  }
}
