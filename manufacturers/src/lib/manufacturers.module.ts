import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ManufacturersEffects } from './+state/manufacturers.effects';
import { ManufacturersFacade } from './+state/manufacturers.facade';
import * as fromManufacturers from './+state/manufacturers.reducer';
import { manufacturersRoutes } from './lib.routes';
import { ManufacturersService } from './services/manufacturers.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(manufacturersRoutes),
    StoreModule.forFeature(
      fromManufacturers.MANUFACTURERS_FEATURE_KEY,
      fromManufacturers.manufacturersReducer
    ),
    EffectsModule.forFeature([ManufacturersEffects]),
  ],
  providers: [
    ManufacturersFacade,
    ManufacturersService
  ],
})
export class ManufacturersModule {}
