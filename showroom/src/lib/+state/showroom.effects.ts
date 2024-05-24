import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ShowroomActions from './showroom.actions';
import * as ShowroomFeature from './showroom.reducer';

@Injectable()
export class ShowroomEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowroomActions.initShowroom),
      switchMap(() =>
        of(ShowroomActions.loadShowroomSuccess({ showroom: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ShowroomActions.loadShowroomFailure({ error }));
      })
    )
  );
}
