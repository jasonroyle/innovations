import { Component, inject } from '@angular/core';

import { VehiclesUiFacade } from '../../+state/vehicles-ui.facade';

@Component({
  selector: 'cw-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  private readonly _vehiclesUiFacade = inject(VehiclesUiFacade);
  public readonly details$ = this._vehiclesUiFacade.allVehicleDetails$;
}
