import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { showroomsRoutes } from './lib.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromShowrooms from './+state/showrooms.reducer';
import { ShowroomsEffects } from './+state/showrooms.effects';
import { ShowroomsFacade } from './+state/showrooms.facade';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(showroomsRoutes),
    StoreModule.forFeature(
      fromShowrooms.SHOWROOMS_FEATURE_KEY,
      fromShowrooms.showroomsReducer
    ),
    EffectsModule.forFeature([ShowroomsEffects]),
  ],
  providers: [ShowroomsFacade],
})
export class ShowroomsModule {}
