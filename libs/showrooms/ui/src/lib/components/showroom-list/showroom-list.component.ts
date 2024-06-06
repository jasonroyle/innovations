import { Component, inject } from '@angular/core';
import { ShowroomsFacade } from '@innovations/showrooms-api';

@Component({
  selector: 'innov-showroom-list',
  templateUrl: './showroom-list.component.html',
  styleUrl: './showroom-list.component.scss',
})
export class ShowroomListComponent {
  private readonly _showroomsFacade = inject(ShowroomsFacade);
  public readonly showrooms$ = this._showroomsFacade.allShowrooms$;
}
