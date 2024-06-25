import { Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufacturersFacade } from '@innovations/manufacturers-api';
import { ShowroomsFacade, ShowroomsService } from '@innovations/showrooms-api';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';

type ShowroomForm = FormGroup<{
  manufacturerId: FormControl<string | null>;
  name: FormControl<string>;
}>;

@Component({
  selector: 'innov-edit-showroom',
  templateUrl: './edit-showroom.component.html',
  styleUrl: './edit-showroom.component.scss',
})
export class EditShowroomComponent implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  private readonly _manufacturersFacade = inject(ManufacturersFacade);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _showroomsFacade = inject(ShowroomsFacade);
  private readonly _showroomsService = inject(ShowroomsService);
  public readonly manufacturers$ = this._manufacturersFacade.allManufacturers$;
  public readonly showroomForm: ShowroomForm = new FormGroup({
    manufacturerId: new FormControl<string | null>(null),
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  public readonly showroom$ = this._showroomsFacade.selectedShowroom$;

  constructor() {
    this._showroomsFacade.selectedShowroom$
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.resetForm());
    this._route.data
      .pipe(takeUntil(this._destroy$))
      .subscribe(({ showroom }) => {
        if (!showroom) {
          this._router.navigate(['../../'], {
            queryParamsHandling: 'merge',
            relativeTo: this._route,
          });
          return;
        }
        this._showroomsFacade.dispatch(
          this._showroomsFacade.actions.selectShowroom_editShowroom({
            id: showroom.id,
          })
        );
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public async resetForm(): Promise<void> {
    const showroom = await firstValueFrom(
      this._showroomsFacade.selectedShowroom$
    );
    this.showroomForm.reset({
      manufacturerId: showroom?.manufacturerId,
      name: showroom?.name,
    });
  }

  public async updateShowroom(): Promise<void> {
    let showroom = await firstValueFrom(
      this._showroomsFacade.selectedShowroom$
    );
    if (!showroom) return;
    const value = this.showroomForm.value;
    const name = `${value.name}`;
    const slug = await this._showroomsService.generateSlug(name, showroom.id);
    showroom = {
      ...showroom,
      manufacturerId: value.manufacturerId ?? undefined,
      name,
      slug,
    };
    this._showroomsFacade.dispatch(
      this._showroomsFacade.actions.updateShowroom_editShowroom({ showroom })
    );
    this._router.navigate(['../../', slug], {
      queryParamsHandling: 'merge',
      relativeTo: this._route,
    });
  }
}
