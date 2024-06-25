import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManufacturersApiModule } from '@innovations/manufacturers-api';
import { SharedModule } from '@innovations/shared';
import { ShowroomsApiModule } from '@innovations/showrooms-api';
import { VehiclesApiModule } from '@innovations/vehicles-api';

import { VehiclesUiFacade } from './+state/vehicles-ui.facade';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { vehiclesUiRoutes } from './lib.routes';
import { VehicleDetailComponent } from './pages/vehicle-detail/vehicle-detail.component';
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
