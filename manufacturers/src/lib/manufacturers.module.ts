import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { manufacturersRoutes } from './lib.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromManufacturers from './+state/manufacturers.reducer';
import { ManufacturersEffects } from './+state/manufacturers.effects';
import { ManufacturersFacade } from './+state/manufacturers.facade';

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
  providers: [ManufacturersFacade],
})
export class ManufacturersModule {}
