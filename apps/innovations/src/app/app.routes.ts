import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'manufacturers',
    loadChildren: () =>
      import('@codeweavers/manufacturers-ui').then(
        (m) => m.ManufacturersUiModule
      ),
  },
  {
    path: 'showrooms',
    loadChildren: () =>
      import('@codeweavers/showrooms-ui').then((m) => m.ShowroomsUiModule),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('@codeweavers/vehicles-ui').then((m) => m.VehiclesUiModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'vehicles' },
];
