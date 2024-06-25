import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ShowroomsFacade } from '../+state/showrooms.facade';
import { Showroom } from '../models/showroom';

@Injectable()
export class ShowroomsService {
  private readonly _showroomsFacade = inject(ShowroomsFacade);

  public async generateSlug(name: string, excludeId?: string): Promise<string> {
    name = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    let showroom: Showroom | undefined;
    let slug = name;
    let i = 0;
    do {
      if (i > 0) slug = `${name}-${i}`;
      showroom = await firstValueFrom(
        this._showroomsFacade.selectShowroomBySlug(`${slug}`)
      );
      i++;
    } while (showroom && (!excludeId || showroom.id !== excludeId));
    return slug;
  }
}
