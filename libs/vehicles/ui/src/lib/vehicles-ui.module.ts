import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShowroomsApiModule } from '@codeweavers/showrooms-api';
import { VehiclesApiModule } from '@codeweavers/vehicles-api';

import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { vehiclesUiRoutes } from './lib.routes';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(vehiclesUiRoutes),
    ShowroomsApiModule,
    VehiclesApiModule,
  ],
  declarations: [
    VehicleDetailComponent,
    VehicleListComponent,
    VehiclesComponent,
  ],
})
export class VehiclesUiModule {}
