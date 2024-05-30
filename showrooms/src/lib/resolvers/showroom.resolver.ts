import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs';

import { ShowroomsFacade } from '../+state/showrooms.facade';
import { ShowroomsEntity } from '../+state/showrooms.models';

export const showroomResolver: ResolveFn<ShowroomsEntity | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const showroomsFacade = inject(ShowroomsFacade);
  return showroomsFacade
    .selectShowroomBySlug(route.paramMap.get('slug') ?? '')
    .pipe(take(1));
}
