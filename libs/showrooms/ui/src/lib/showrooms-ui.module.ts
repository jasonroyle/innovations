import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@codeweavers/shared';
import { ShowroomsApiModule } from '@codeweavers/showrooms-api';
import { VehiclesApiModule } from '@codeweavers/vehicles-api';

import { AddShowroomComponent } from './components/add-showroom/add-showroom.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { ShowroomDetailComponent } from './components/showroom-detail/showroom-detail.component';
import { ShowroomListComponent } from './components/showroom-list/showroom-list.component';
import { showroomsUiRoutes } from './lib.routes';
import { ShowroomsComponent } from './pages/showrooms/showrooms.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(showroomsUiRoutes),
    ReactiveFormsModule,
    SharedModule,
    ShowroomsApiModule,
    VehiclesApiModule,
  ],
  declarations: [
    AddShowroomComponent,
    AddVehicleComponent,
    ShowroomDetailComponent,
    ShowroomListComponent,
    ShowroomsComponent,
  ],
})
export class ShowroomsUiModule {}
