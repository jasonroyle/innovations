import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManufacturersApiModule } from '@codeweavers/manufacturers-api';
import { SharedModule } from '@codeweavers/shared';
import { ShowroomsApiModule } from '@codeweavers/showrooms-api';
import { VehiclesApiModule } from '@codeweavers/vehicles-api';

import { VehiclesUiFacade } from './+state/vehicles-ui.facade';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { vehiclesUiRoutes } from './lib.routes';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';

@NgModule({
  imports: [
    CommonModule,
    ManufacturersApiModule,
    RouterModule.forChild(vehiclesUiRoutes),
    SharedModule,
    ShowroomsApiModule,
    VehiclesApiModule,
  ],
  declarations: [
    VehicleDetailComponent,
    VehicleListComponent,
    VehiclesComponent,
  ],
  providers: [VehiclesUiFacade],
})
export class VehiclesUiModule {}
