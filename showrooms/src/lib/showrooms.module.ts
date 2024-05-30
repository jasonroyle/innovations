import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ManufacturersModule } from '@codeweavers/manufacturers';
import { SharedModule } from '@codeweavers/shared';
import { VehiclesApiModule } from '@codeweavers/vehicles';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ShowroomsEffects } from './+state/showrooms.effects';
import { ShowroomsFacade } from './+state/showrooms.facade';
import * as fromShowrooms from './+state/showrooms.reducer';
import { AddShowroomComponent } from './components/add-showroom/add-showroom.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { ShowroomDetailComponent } from './components/showroom-detail/showroom-detail.component';
import { ShowroomListComponent } from './components/showroom-list/showroom-list.component';
import { showroomsRoutes } from './lib.routes';
import { ShowroomsComponent } from './pages/showrooms/showrooms.component';
import { ShowroomsService } from './services/showrooms.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(showroomsRoutes),
    StoreModule.forFeature(
      fromShowrooms.SHOWROOMS_FEATURE_KEY,
      fromShowrooms.showroomsReducer
    ),
    EffectsModule.forFeature([ShowroomsEffects]),
    ReactiveFormsModule,
    ManufacturersModule,
    SharedModule,
    VehiclesApiModule,
  ],
  providers: [ShowroomsFacade, ShowroomsService],
  declarations: [
    AddShowroomComponent,
    AddVehicleComponent,
    ShowroomDetailComponent,
    ShowroomsComponent,
    ShowroomListComponent,
  ],
})
export class ShowroomsModule {}
