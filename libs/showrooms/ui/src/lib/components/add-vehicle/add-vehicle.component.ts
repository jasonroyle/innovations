import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Showroom } from '@innovations/showrooms-api';
import { VehiclesFacade } from '@innovations/vehicles-api';

import { ShowroomsUiFacade } from '../../+state/showrooms-ui.facade';

interface VehicleForm {
  vehicleId: FormControl<string | null>;
}

@Component({
  selector: 'innov-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss',
})
export class AddVehicleComponent {
  private _showroom?: Showroom;
  private readonly _showroomsUiFacade = inject(ShowroomsUiFacade);
  private readonly _vehiclesFacade = inject(VehiclesFacade);
  public vehicleDetails$ =
    this._showroomsUiFacade.vehicleDetailsWithoutShowroom$;
  public readonly vehicleForm = new FormGroup<VehicleForm>({
    vehicleId: new FormControl(null, [Validators.required]),
  });

  @Input() public set showroom(showroom: Showroom | undefined) {
    this._showroom = showroom;
    if (showroom?.manufacturerId) {
      this.vehicleDetails$ =
        this._showroomsUiFacade.vehicleDetailsWithoutShowroomByManufacturerId(
          showroom.manufacturerId
        );
    } else {
      this.vehicleDetails$ =
        this._showroomsUiFacade.vehicleDetailsWithoutShowroom$;
    }
  }

  public get showroom(): Showroom | undefined {
    return this._showroom;
  }

  public addVehicle(): void {
    const value = this.vehicleForm.value;
    if (!value.vehicleId) return;
    this._vehiclesFacade.dispatch(
      this._vehiclesFacade.actions.linkShowroom_showroomAddVehicle({
        registrationMark: value.vehicleId,
        showroomId: this.showroom?.id,
      })
    );
    this.vehicleForm.reset();
  }
}
