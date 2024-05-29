import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ShowroomsFacade } from '../../+state/showrooms.facade';
import { Showroom } from '../../models/showroom';

interface VehicleForm {
  vehicleId: FormControl<string | null>;
}

@Component({
  selector: 'cw-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss',
})
export class AddVehicleComponent {
  private _showroom?: Showroom
  private readonly _showroomsFacade = inject(ShowroomsFacade);
  public vehicleDetails$ = this._showroomsFacade.allVehicleDetailsWithoutShowroom$;
  public readonly vehicleForm = new FormGroup<VehicleForm>({
    vehicleId: new FormControl(null, [Validators.required])
  });

  @Input() public set showroom(showroom: Showroom | undefined) {
    this._showroom = showroom;
    if (showroom?.manufacturerId) {
      this.vehicleDetails$ = this._showroomsFacade.selectVehicleDetailsWithoutShowroomByManufacturerId(
        showroom.manufacturerId
      );
    } else {
      this.vehicleDetails$ = this._showroomsFacade.allVehicleDetailsWithoutShowroom$;
    }
  }

  public get showroom(): Showroom | undefined {
    return this._showroom;
  }

  public addVehicle(): void {
    const value = this.vehicleForm.value;
    if (!value.vehicleId) return;
    this._showroomsFacade.dispatch(
      this._showroomsFacade.actions.addVehicle_showroomDetail({
        vehicleId: value.vehicleId
      })
    );
    this.vehicleForm.reset();
  }
}
