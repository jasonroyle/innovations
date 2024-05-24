import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { VehiclesFacade } from '../../+state/vehicles.facade';

@Component({
  selector: 'cw-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css',
})
export class VehicleDetailComponent implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  private readonly _route = inject(ActivatedRoute);
  private readonly _vehiclesFacade = inject(VehiclesFacade);
  public readonly vehicle$ = this._vehiclesFacade.selectedVehicleWithManufacturer$;

  constructor() {
    this._route.paramMap
      .pipe(takeUntil(this._destroy$))
      .subscribe(paramMap => {
        this._vehiclesFacade.dispatch(
          this._vehiclesFacade.actions.selectVehicle_vehicleList({
            id: paramMap.get('id') ?? undefined
          })
        )
      })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
