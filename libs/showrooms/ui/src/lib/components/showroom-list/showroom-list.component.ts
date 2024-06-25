import { Component, inject } from '@angular/core';
import { ArrayUtilSearchWeight, SearchEvent } from '@innovations/shared';
import { ShowroomsFacade } from '@innovations/showrooms-api';
import { BehaviorSubject, concat, take } from 'rxjs';

import { ShowroomsUiFacade } from '../../+state/showrooms-ui.facade';
import { ShowroomDetail } from '../../+state/showrooms-ui.models';

@Component({
  selector: 'innov-showroom-list',
  templateUrl: './showroom-list.component.html',
  styleUrl: './showroom-list.component.scss',
})
export class ShowroomListComponent {
  private readonly _searchResult$ = new BehaviorSubject<ShowroomDetail[]>([]);
  private readonly _showroomsFacade = inject(ShowroomsFacade);
  private readonly _showroomsUiFacade = inject(ShowroomsUiFacade);
  public readonly allShowroomDetails$ =
    this._showroomsUiFacade.allShowroomDetails$;
  public readonly filteredShowroomDetails$ = this._searchResult$.asObservable();
  public readonly searchTerm$ = this._showroomsFacade.searchTerm$;
  public readonly searchWeight: ArrayUtilSearchWeight<ShowroomDetail> = {
    manufacturer: { name: 2 },
    showroom: { name: 3 },
    vehicleDetails: {
      manufacturer: { name: 2 },
      vehicle: { color: 1, model: 1 },
    },
  };

  public onSearch(search: SearchEvent<ShowroomDetail>): void {
    this._searchResult$.next(search.result);
    this._showroomsFacade.dispatch(
      this._showroomsFacade.actions.searchShowrooms_showroomList({
        searchTerm: search.term,
      })
    );
  }
}
