import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManufacturersModule } from '@codeweavers/manufacturers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromVehicles from './+state/vehicles.reducer';
import { VehiclesEffects } from './+state/vehicles.effects';
import { VehiclesFacade } from './+state/vehicles.facade';
import { RegistrationNumberPipe } from './pipes/registration-number/registration-number.pipe';
import { VehiclesService } from './services/vehicles.service';

const exports = [
  RegistrationNumberPipe
];

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
  declarations: [
    ...exports
  ],
  providers: [
    VehiclesFacade,
    VehiclesService
  ],
  exports
})
export class VehiclesApiModule {}
