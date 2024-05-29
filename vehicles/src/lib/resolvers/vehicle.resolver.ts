import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs';

import { VehiclesFacade } from '../+state/vehicles.facade';
import { VehiclesEntity } from '../+state/vehicles.models';

export const vehicleResolver: ResolveFn<VehiclesEntity | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const vehiclesFacade = inject(VehiclesFacade);
  return vehiclesFacade
    .selectVehicleByRegistrationNumber(route.paramMap.get('registrationNumber') ?? '')
    .pipe(take(1));
}
