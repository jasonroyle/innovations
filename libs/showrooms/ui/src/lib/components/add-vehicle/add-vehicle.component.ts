import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Showroom, ShowroomsFacade } from '@codeweavers/showrooms-api';
import { VehiclesFacade } from '@codeweavers/vehicles-api';

interface VehicleForm {
  vehicleId: FormControl<string | null>;
}

@Component({
  selector: 'cw-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss',
})
export class AddVehicleComponent {
  private _showroom?: Showroom;
  private readonly _showroomsFacade = inject(ShowroomsFacade);
  private readonly _vehiclesFacade = inject(VehiclesFacade);
  public vehicleDetails$ =
    this._vehiclesFacade.allVehicleDetailsWithoutShowroom$;
  public readonly vehicleForm = new FormGroup<VehicleForm>({
    vehicleId: new FormControl(null, [Validators.required]),
  });

  @Input() public set showroom(showroom: Showroom | undefined) {
    this._showroom = showroom;
    if (showroom?.manufacturerId) {
      this.vehicleDetails$ =
        this._vehiclesFacade.selectVehicleDetailsWithoutShowroomByManufacturerId(
          showroom.manufacturerId
        );
    } else {
      this.vehicleDetails$ =
        this._vehiclesFacade.allVehicleDetailsWithoutShowroom$;
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
        registrationNumber: value.vehicleId,
        showroomId: this.showroom?.id,
      })
    );
    this.vehicleForm.reset();
  }
}
