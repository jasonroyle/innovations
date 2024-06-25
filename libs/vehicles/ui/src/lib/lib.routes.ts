import { Route } from '@angular/router';

import { VehicleDetailComponent } from './pages/vehicle-detail/vehicle-detail.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { vehicleResolver } from './resolvers/vehicle.resolver';

export const vehiclesUiRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: VehiclesComponent,
    children: [
      {
        path: ':registrationNumber',
        pathMatch: 'full',
        component: VehicleDetailComponent,
        resolve: { vehicle: vehicleResolver },
      },
    ],
  },
];
