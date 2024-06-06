import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ManufacturersEffects } from './+state/manufacturers.effects';
import { ManufacturersFacade } from './+state/manufacturers.facade';
import * as fromManufacturers from './+state/manufacturers.reducer';
import { ManufacturersService } from './services/manufacturers.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromManufacturers.MANUFACTURERS_FEATURE_KEY,
      fromManufacturers.manufacturersReducer
    ),
    EffectsModule.forFeature([ManufacturersEffects]),
  ],
  providers: [ManufacturersFacade, ManufacturersService],
})
export class ManufacturersApiModule {}
