import { Route } from '@angular/router';

import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { vehicleResolver } from './resolvers/vehicle.resolver';

export const vehiclesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: VehiclesComponent,
    children: [
      {
        path: ':id',
        pathMatch: 'full',
        component: VehicleDetailComponent,
        resolve: { vehicle: vehicleResolver }
      }
    ]
  }
];
