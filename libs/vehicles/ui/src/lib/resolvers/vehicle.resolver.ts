import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { VehiclesEntity, VehiclesFacade } from '@innovations/vehicles-api';
import { take } from 'rxjs';

export const vehicleResolver: ResolveFn<VehiclesEntity | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const vehiclesFacade = inject(VehiclesFacade);
  return vehiclesFacade
    .selectVehicleByRegistrationMark(
      route.paramMap.get('registrationMark') ?? ''
    )
    .pipe(take(1));
};
