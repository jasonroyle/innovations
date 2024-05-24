import { Component, inject } from '@angular/core';

import { VehiclesFacade } from '../../+state/vehicles.facade';

@Component({
  selector: 'cw-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css',
})
export class VehicleListComponent {
  private readonly _vehiclesFacade = inject(VehiclesFacade);
  public readonly vehicles$ = this._vehiclesFacade.allVehiclesWithManufacturers$;
}
