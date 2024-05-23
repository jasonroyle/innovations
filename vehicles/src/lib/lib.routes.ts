import { Route } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

export const vehiclesRoutes: Route[] = [
  { path: 'list', pathMatch: 'full', component: VehicleListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'list' }
];
