import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ShowroomsEffects } from './+state/showrooms.effects';
import { ShowroomsFacade } from './+state/showrooms.facade';
import * as fromShowrooms from './+state/showrooms.reducer';
import { ShowroomsService } from './services/showrooms.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromShowrooms.SHOWROOMS_FEATURE_KEY,
      fromShowrooms.showroomsReducer,
      { metaReducers: fromShowrooms.showroomsMetaReducers }
    ),
    EffectsModule.forFeature([ShowroomsEffects]),
  ],
  providers: [ShowroomsFacade, ShowroomsService],
})
export class ShowroomsApiModule {}
