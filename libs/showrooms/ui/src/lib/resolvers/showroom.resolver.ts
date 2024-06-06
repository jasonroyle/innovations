import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ShowroomsEntity, ShowroomsFacade } from '@codeweavers/showrooms-api';
import { take } from 'rxjs';

export const showroomResolver: ResolveFn<ShowroomsEntity | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const showroomsFacade = inject(ShowroomsFacade);
  return showroomsFacade
    .selectShowroomBySlug(route.paramMap.get('slug') ?? '')
    .pipe(take(1));
};
