import { Component, inject } from '@angular/core';
import { VehiclesFacade } from '@codeweavers/vehicles-api';

@Component({
  selector: 'cw-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  private readonly _vehiclesFacade = inject(VehiclesFacade);
  public readonly details$ = this._vehiclesFacade.allVehicleDetails$;
}
