import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManufacturersModule } from '@codeweavers/manufacturers';
import { SharedModule } from '@codeweavers/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromVehicles from './+state/vehicles.reducer';
import { VehiclesEffects } from './+state/vehicles.effects';
import { VehiclesFacade } from './+state/vehicles.facade';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { vehiclesRoutes } from './lib.routes';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(vehiclesRoutes),
    StoreModule.forFeature(
      fromVehicles.VEHICLES_FEATURE_KEY,
      fromVehicles.vehiclesReducer
    ),
    EffectsModule.forFeature([VehiclesEffects]),
    ManufacturersModule,
    SharedModule,
  ],
  providers: [
    VehiclesFacade,
    VehiclesService
  ],
  declarations: [
    VehicleDetailComponent,
    VehicleListComponent,
    VehiclesComponent
  ],
})
export class VehiclesModule {}
