import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManufacturersFacade } from '@codeweavers/manufacturers';

import { ShowroomsFacade } from '../../+state/showrooms.facade';
import { ShowroomsEntity } from '../../+state/showrooms.models';
import { ShowroomsService } from '../../services/showrooms.service';

interface ShowroomForm {
  manufacturerId: FormControl<string | null>;
  name: FormControl<string>;
}

@Component({
  selector: 'cw-add-showroom',
  templateUrl: './add-showroom.component.html',
  styleUrl: './add-showroom.component.scss',
})
export class AddShowroomComponent {
  private readonly _manufacturersFacade = inject(ManufacturersFacade);
  private readonly _showroomsFacade = inject(ShowroomsFacade);
  private readonly _showroomsService = inject(ShowroomsService);
  public manufacturers$ = this._manufacturersFacade.allManufacturers$;
  public showroomForm = new FormGroup<ShowroomForm>({
    manufacturerId: new FormControl<string | null>(null),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public async addShowroom(): Promise<void> {
    const value = this.showroomForm.value;
    const name = `${value.name}`;
    const slug = await this._showroomsService.generateSlug(name);
    const showroom: ShowroomsEntity = {
      id: `${Math.ceil(Math.random() * 1000)}`,
      manufacturerId: value.manufacturerId ?? undefined,
      name,
      slug,
    };
    this._showroomsFacade.dispatch(
      this._showroomsFacade.actions.addShowroom_addShowroom({ showroom })
    );
    this.showroomForm.reset();
  }
}
