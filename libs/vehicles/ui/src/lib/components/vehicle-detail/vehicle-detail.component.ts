import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Showroom, ShowroomsFacade } from '@codeweavers/showrooms-api';
import { VehiclesFacade } from '@codeweavers/vehicles-api';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'cw-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss',
})
export class VehicleDetailComponent implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _showroomsFacade = inject(ShowroomsFacade);
  private readonly _vehiclesFacade = inject(VehiclesFacade);
  public readonly detail$ = this._vehiclesFacade.selectedVehicleDetail$;
  public showroom$?: Observable<Showroom | undefined>;

  constructor() {
    this._route.data
      .pipe(takeUntil(this._destroy$))
      .subscribe(({ vehicle }) => {
        if (!vehicle)
          this._router.navigate(['../'], { relativeTo: this._route });
        this._vehiclesFacade.dispatch(
          this._vehiclesFacade.actions.selectVehicle_vehicleList({
            registrationNumber: vehicle.registrationNumber,
          })
        );
        this.showroom$ = vehicle.showroomId
          ? this._showroomsFacade.selectShowroomById(vehicle.showroomId)
          : undefined;
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
