import { Component, EventEmitter, Output, inject } from '@angular/core';
import { VehiclesFacade } from '@innovations/vehicles-api';
import { BehaviorSubject, firstValueFrom, map, tap } from 'rxjs';

import { ShowroomsUiFacade } from '../../+state/showrooms-ui.facade';
import { VehicleDetail } from '../../+state/showrooms-ui.models';

interface Vehicle {
  hovered: boolean;
  selected: boolean;
  vehicleDetail: VehicleDetail;
}

type Vehicles = Record<string, Vehicle>;

@Component({
  selector: 'innov-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  private readonly _showroomsUiFacade = inject(ShowroomsUiFacade);
  private readonly _vehicles$ = new BehaviorSubject<Vehicles>({});
  private readonly _vehiclesFacade = inject(VehiclesFacade);
  public readonly showroomDetail$ =
    this._showroomsUiFacade.selectedShowroomDetail$.pipe(
      tap((showroomDetail) =>
        this._vehicles$.next(
          (showroomDetail?.vehicleDetails ?? []).reduce<Vehicles>(
            (vehicles, vehicleDetail) => ({
              ...vehicles,
              [vehicleDetail.vehicle.registrationNumber]: {
                hovered: false,
                selected: false,
                vehicleDetail,
              },
            }),
            {}
          )
        )
      )
    );
  @Output() public readonly vehicleSelect = new EventEmitter<VehicleDetail>();
  public vehicleSelectionEnabled = false;
  public readonly vehicles$ = this._vehicles$.asObservable();
  public readonly selectedVehicles$ = this.vehicles$.pipe(
    map((vehicles) =>
      Object.keys(vehicles)
        .filter((registrationNumber) => vehicles[registrationNumber].selected)
        .map((registrationNumber) => vehicles[registrationNumber].vehicleDetail)
    )
  );

  public get selectedVehicles(): Promise<VehicleDetail[]> {
    return firstValueFrom(this.selectedVehicles$);
  }

  public get vehicles(): Promise<Vehicles> {
    return firstValueFrom(this._vehicles$);
  }

  private async _getVehicle(
    registrationNumber: string
  ): Promise<[Vehicle, Vehicles]> {
    const vehicles = await this.vehicles;
    const vehicle = vehicles[registrationNumber];
    if (!vehicle) throw 'Invalid vehicle registration number';
    return [vehicle, vehicles];
  }

  private async _patchVehicle(
    registrationNumber: string,
    patch: Partial<Vehicle>
  ): Promise<void> {
    const [vehicle, vehicles] = await this._getVehicle(registrationNumber);
    this._vehicles$.next({
      ...vehicles,
      [registrationNumber]: {
        ...vehicle,
        ...patch,
      },
    });
  }

  public async hoverVehicle(vehicle: Vehicle, hovered: boolean): Promise<void> {
    this._patchVehicle(vehicle.vehicleDetail.vehicle.registrationNumber, {
      hovered,
    });
  }

  public async removeVehicles(): Promise<void> {
    const selectedVehicles = await this.selectedVehicles;
    selectedVehicles.forEach(({ vehicle: { registrationNumber } }) =>
      this._vehiclesFacade.dispatch(
        this._vehiclesFacade.actions.linkShowroom_showroomVehicleList({
          registrationNumber,
        })
      )
    );
    this.vehicleSelectionEnabled = false;
  }

  public async selectVehicle(
    vehicle: Vehicle,
    selected?: boolean
  ): Promise<void> {
    if (this.vehicleSelectionEnabled) {
      this._patchVehicle(vehicle.vehicleDetail.vehicle.registrationNumber, {
        selected: selected ?? !vehicle.selected,
      });
    } else {
      this.vehicleSelect.emit(vehicle.vehicleDetail);
    }
  }

  public toggleVehicleSelection(): void {
    this.vehicleSelectionEnabled = !this.vehicleSelectionEnabled;
  }
}
