import { Component, inject } from '@angular/core';
import { ArrayUtilSearchWeight, SearchEvent } from '@innovations/shared';
import { VehiclesFacade } from '@innovations/vehicles-api';
import { BehaviorSubject } from 'rxjs';

import { VehiclesUiFacade } from '../../+state/vehicles-ui.facade';
import { VehicleDetail } from '../../+state/vehicles-ui.models';

@Component({
  selector: 'innov-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  private readonly _searchResult$ = new BehaviorSubject<VehicleDetail[]>([]);
  private readonly _vehiclesFacade = inject(VehiclesFacade);
  private readonly _vehiclesUiFacade = inject(VehiclesUiFacade);
  public activeVehicleDetail: VehicleDetail | null = null;
  public readonly allVehicleDetails$ =
    this._vehiclesUiFacade.allVehicleDetails$;
  public readonly filteredVehicleDetails$ = this._searchResult$.asObservable();
  public readonly searchTerm$ = this._vehiclesFacade.searchTerm$;
  public readonly searchWeight: ArrayUtilSearchWeight<VehicleDetail> = {
    manufacturer: {
      name: 2,
    },
    showroom: {
      name: 1,
    },
    vehicle: {
      color: 1,
      model: 2,
      registrationMark: 4,
    },
  };

  public onIsActiveChange(
    vehicleDetail: VehicleDetail,
    isActive: boolean
  ): void {
    if (isActive) this.activeVehicleDetail = vehicleDetail;
    else if (this.activeVehicleDetail === vehicleDetail)
      this.activeVehicleDetail = null;
  }

  public onSearch(search: SearchEvent<VehicleDetail>): void {
    this._searchResult$.next(search.result);
    this._vehiclesFacade.dispatch(
      this._vehiclesFacade.actions.searchVehicles_vehicleList({
        searchTerm: search.term,
      })
    );
  }
}
