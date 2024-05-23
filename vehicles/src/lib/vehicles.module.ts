import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { vehiclesRoutes } from './lib.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromVehicles from './+state/vehicles.reducer';
import { VehiclesEffects } from './+state/vehicles.effects';
import { VehiclesFacade } from './+state/vehicles.facade';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(vehiclesRoutes),
    StoreModule.forFeature(
      fromVehicles.VEHICLES_FEATURE_KEY,
      fromVehicles.vehiclesReducer
    ),
    EffectsModule.forFeature([VehiclesEffects]),
  ],
  providers: [VehiclesFacade],
})
export class VehiclesModule {}
