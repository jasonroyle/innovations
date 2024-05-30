import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@codeweavers/shared';

import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { vehiclesRoutes } from './lib.routes';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { VehiclesApiModule } from './vehicles-api.module';

@NgModule({
  imports: [
    CommonModule,
    VehiclesApiModule,
    SharedModule,
    RouterModule.forChild(vehiclesRoutes),
  ],
  declarations: [
    VehicleDetailComponent,
    VehicleListComponent,
    VehiclesComponent,
  ]
})
export class VehiclesModule {}
