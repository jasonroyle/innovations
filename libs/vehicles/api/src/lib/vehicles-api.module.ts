import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromVehicles from './+state/vehicles.reducer';
import { VehiclesEffects } from './+state/vehicles.effects';
import { VehiclesFacade } from './+state/vehicles.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromVehicles.VEHICLES_FEATURE_KEY,
      fromVehicles.vehiclesReducer
    ),
    EffectsModule.forFeature([VehiclesEffects]),
  ],
  providers: [VehiclesFacade],
})
export class VehiclesApiModule {}
