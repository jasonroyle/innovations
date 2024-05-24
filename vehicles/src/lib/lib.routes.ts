import { Route } from '@angular/router';

import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';

export const vehiclesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: VehiclesComponent,
    children: [
      {
        path: ':id',
        pathMatch: 'full',
        component: VehicleDetailComponent
      }
    ]
  }
];
