import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'vehicles-ui',
    loadChildren: () =>
      import('@codeweavers/vehicles-ui').then((m) => m.VehiclesUiModule),
  },
  {
    path: 'manufacturers-ui',
    loadChildren: () =>
      import('@codeweavers/manufacturers-ui').then(
        (m) => m.ManufacturersUiModule
      ),
  },
  {
    path: 'showrooms-ui',
    loadChildren: () =>
      import('@codeweavers/showrooms-ui').then((m) => m.ShowroomsUiModule),
  },
  {
    path: 'showrooms',
    loadChildren: () =>
      import('@codeweavers/showrooms').then((m) => m.ShowroomsModule),
  },
  {
    path: 'manufacturers',
    loadChildren: () =>
      import('@codeweavers/manufacturers').then((m) => m.ManufacturersModule),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('@codeweavers/vehicles').then((m) => m.VehiclesModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'vehicles' },
];
