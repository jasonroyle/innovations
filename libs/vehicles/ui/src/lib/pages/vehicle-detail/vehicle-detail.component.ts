import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesFacade } from '@innovations/vehicles-api';
import { Subject, takeUntil } from 'rxjs';

import { VehiclesUiFacade } from '../../+state/vehicles-ui.facade';

@Component({
  selector: 'innov-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss',
})
export class VehicleDetailComponent implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _vehiclesFacade = inject(VehiclesFacade);
  private readonly _vehiclesUiFacade = inject(VehiclesUiFacade);
  public readonly vehicleDetail$ =
    this._vehiclesUiFacade.selectedVehicleDetail$;

  constructor() {
    this._route.data
      .pipe(takeUntil(this._destroy$))
      .subscribe(({ vehicle }) => {
        if (!vehicle)
          this._router.navigate(['../'], { relativeTo: this._route });
        this._vehiclesFacade.dispatch(
          this._vehiclesFacade.actions.selectVehicle_vehicleList({
            registrationMark: vehicle.registrationMark,
          })
        );
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
