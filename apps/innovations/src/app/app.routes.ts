import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'vehicles',
    loadChildren: () =>
      import('@codeweavers/vehicles').then((m) => m.VehiclesModule),
  },
];
