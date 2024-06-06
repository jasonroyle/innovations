import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowroomsFacade } from '@codeweavers/showrooms-api';
import { Subject, takeUntil } from 'rxjs';

import { ShowroomsUiFacade } from '../../+state/showrooms-ui.facade';

@Component({
  selector: 'cw-showroom-detail',
  templateUrl: './showroom-detail.component.html',
  styleUrl: './showroom-detail.component.scss',
})
export class ShowroomDetailComponent {
  private readonly _destroy$ = new Subject<void>();
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _showroomsFacade = inject(ShowroomsFacade);
  private readonly _showroomsUiFacade = inject(ShowroomsUiFacade);
  public readonly showroomDetail$ =
    this._showroomsUiFacade.selectedShowroomDetail$;

  constructor() {
    this._route.data
      .pipe(takeUntil(this._destroy$))
      .subscribe(({ showroom }) => {
        if (!showroom) {
          this._router.navigate(['../'], { relativeTo: this._route });
          return;
        }
        this._showroomsFacade.dispatch(
          this._showroomsFacade.actions.selectShowroom_showroomDetail({
            id: showroom.id,
          })
        );
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
