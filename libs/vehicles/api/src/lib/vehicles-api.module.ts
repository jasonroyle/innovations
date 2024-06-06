import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { VehiclesEffects } from './+state/vehicles.effects';
import { VehiclesFacade } from './+state/vehicles.facade';
import * as fromVehicles from './+state/vehicles.reducer';
import { RegistrationNumberPipe } from './pipes/registration-number/registration-number.pipe';
import { VehiclesService } from './services/vehicles.service';

const exports = [RegistrationNumberPipe];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromVehicles.VEHICLES_FEATURE_KEY,
      fromVehicles.vehiclesReducer,
      { metaReducers: fromVehicles.vehiclesMetaReducers }
    ),
    EffectsModule.forFeature([VehiclesEffects]),
  ],
  providers: [VehiclesFacade, VehiclesService],
  declarations: [...exports],
  exports,
})
export class VehiclesApiModule {}
