import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'manufacturers',
    loadChildren: () =>
      import('@innovations/manufacturers-ui').then(
        (m) => m.ManufacturersUiModule
      ),
  },
  {
    path: 'showrooms',
    loadChildren: () =>
      import('@innovations/showrooms-ui').then((m) => m.ShowroomsUiModule),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('@innovations/vehicles-ui').then((m) => m.VehiclesUiModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'vehicles' },
];
