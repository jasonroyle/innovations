import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManufacturersModule } from '@codeweavers/manufacturers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromVehicles from './+state/vehicles.reducer';
import { VehiclesEffects } from './+state/vehicles.effects';
import { VehiclesFacade } from './+state/vehicles.facade';
import { VehiclesService } from './services/vehicles.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromVehicles.VEHICLES_FEATURE_KEY,
      fromVehicles.vehiclesReducer
    ),
    EffectsModule.forFeature([VehiclesEffects]),
    ManufacturersModule
  ],
  providers: [
    VehiclesFacade,
    VehiclesService
  ]
})
export class VehiclesApiModule {}
