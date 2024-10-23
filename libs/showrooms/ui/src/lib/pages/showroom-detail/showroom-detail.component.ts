import { Component, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowroomsFacade } from '@innovations/showrooms-api';

import { ShowroomsUiFacade } from '../../+state/showrooms-ui.facade';
import { VehicleDetail } from '../../+state/showrooms-ui.models';
import { VehicleListComponent } from '../../components/vehicle-list/vehicle-list.component';

@Component({
  selector: 'innov-showroom-detail',
  templateUrl: './showroom-detail.component.html',
  styleUrl: './showroom-detail.component.scss',
})
export class ShowroomDetailComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _showroomsFacade = inject(ShowroomsFacade);
  private readonly _showroomsUiFacade = inject(ShowroomsUiFacade);
  @ViewChild(VehicleListComponent)
  private _vehicleListComponent?: VehicleListComponent;
  public readonly showroomDetail$ =
    this._showroomsUiFacade.selectedShowroomDetail$;

  constructor() {
    this._route.data.pipe(takeUntilDestroyed()).subscribe(({ showroom }) => {
      if (!showroom) {
        this._router.navigate(['../'], {
          queryParamsHandling: 'merge',
          relativeTo: this._route,
        });
        return;
      }
      if (this._vehicleListComponent)
        this._vehicleListComponent.vehicleSelectionEnabled = false;
      this._showroomsFacade.dispatch(
        this._showroomsFacade.actions.selectShowroom_showroomDetail({
          id: showroom.id,
        })
      );
    });
  }

  public onVehicleSelect({
    vehicle: { registrationMark },
  }: VehicleDetail): void {
    this._router.navigate(['/vehicles', registrationMark]);
  }
}
