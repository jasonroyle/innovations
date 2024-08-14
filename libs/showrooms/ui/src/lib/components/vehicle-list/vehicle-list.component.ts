import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { VehiclesEntity, VehiclesFacade } from '@innovations/vehicles-api';

import { ShowroomsUiFacade } from '../../+state/showrooms-ui.facade';

@Component({
  selector: 'innov-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  private readonly _showroomsUiFacade = inject(ShowroomsUiFacade);
  private _vehicleSelectionEnabled = false;
  private readonly _vehiclesFacade = inject(VehiclesFacade);
  @Output() public readonly vehicleSelect = new EventEmitter<VehiclesEntity>();
  public selectedVehicles: VehiclesEntity[] = [];
  public readonly showroomDetail$ =
    this._showroomsUiFacade.selectedShowroomDetail$;
  public readonly vehicleDetails$ =
    this._showroomsUiFacade.selectedShowroomVehicleDetails$;

  public get vehicleSelectionEnabled(): boolean {
    return this._vehicleSelectionEnabled;
  }
  public set vehicleSelectionEnabled(enabled: boolean) {
    this._vehicleSelectionEnabled = enabled;
    if (!enabled) this.selectedVehicles = [];
  }

  public removeVehicles(): void {
    this.selectedVehicles.forEach((vehicle) =>
      this._vehiclesFacade.dispatch(
        this._vehiclesFacade.actions.linkShowroom_showroomVehicleList({
          registrationNumber: vehicle.registrationNumber,
        })
      )
    );
    this.selectedVehicles = [];
    this.vehicleSelectionEnabled = false;
  }

  public selectVehicle(vehicle: VehiclesEntity): void {
    if (this.vehicleSelectionEnabled) {
      const index = this.selectedVehicles.findIndex(
        ({ registrationNumber }) =>
          registrationNumber === vehicle.registrationNumber
      );
      const selectedVehicles = [...this.selectedVehicles];
      if (index === -1) selectedVehicles.push(vehicle);
      else selectedVehicles.splice(index, 1);
      this.selectedVehicles = [...selectedVehicles];
    } else {
      this.vehicleSelect.emit(vehicle);
    }
  }

  public toggleVehicleSelection(): void {
    this.vehicleSelectionEnabled = !this.vehicleSelectionEnabled;
  }
}
