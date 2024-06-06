import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ShowroomsActions from './showrooms.actions';
import { ShowroomsEffects } from './showrooms.effects';

describe('ShowroomsEffects', () => {
  let actions: Observable<Action>;
  let effects: ShowroomsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ShowroomsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ShowroomsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ShowroomsActions.initShowrooms() });

      const expected = hot('-a-|', {
        a: ShowroomsActions.loadShowroomsSuccess({ showrooms: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
