import { Component, inject } from '@angular/core';
import { ShowroomsFacade } from '@codeweavers/showrooms-api';

@Component({
  selector: 'cw-showroom-list',
  templateUrl: './showroom-list.component.html',
  styleUrl: './showroom-list.component.scss',
})
export class ShowroomListComponent {
  private readonly _showroomsFacade = inject(ShowroomsFacade);
  public readonly showrooms$ = this._showroomsFacade.allShowrooms$;
}
