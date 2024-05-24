import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { showroomRoutes } from './lib.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromShowroom from './+state/showroom.reducer';
import { ShowroomEffects } from './+state/showroom.effects';
import { ShowroomFacade } from './+state/showroom.facade';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(showroomRoutes),
    StoreModule.forFeature(
      fromShowroom.SHOWROOM_FEATURE_KEY,
      fromShowroom.showroomReducer
    ),
    EffectsModule.forFeature([ShowroomEffects]),
  ],
  providers: [ShowroomFacade],
})
export class ShowroomModule {}
