import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ManufacturersApiModule } from '@innovations/manufacturers-api';
import { SharedModule } from '@innovations/shared';
import { ShowroomsApiModule } from '@innovations/showrooms-api';
import { VehiclesApiModule } from '@innovations/vehicles-api';

import { ShowroomsUiFacade } from './+state/showrooms-ui.facade';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { ShowroomListComponent } from './components/showroom-list/showroom-list.component';
import { showroomsUiRoutes } from './lib.routes';
import { AddShowroomComponent } from './pages/add-showroom/add-showroom.component';
import { EditShowroomComponent } from './pages/edit-showroom/edit-showroom.component';
import { ShowroomDetailComponent } from './pages/showroom-detail/showroom-detail.component';
import { ShowroomsComponent } from './pages/showrooms/showrooms.component';

@NgModule({
  imports: [
    CommonModule,
    ManufacturersApiModule,
    ReactiveFormsModule,
    RouterModule.forChild(showroomsUiRoutes),
    SharedModule,
    ShowroomsApiModule,
    VehiclesApiModule,
  ],
  declarations: [
    AddShowroomComponent,
    AddVehicleComponent,
    EditShowroomComponent,
    ShowroomDetailComponent,
    ShowroomListComponent,
    ShowroomsComponent,
  ],
  providers: [ShowroomsUiFacade],
})
export class ShowroomsUiModule {}
