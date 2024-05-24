import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'showroom',
    loadChildren: () =>
      import('@codeweavers/showroom').then((m) => m.ShowroomModule),
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
