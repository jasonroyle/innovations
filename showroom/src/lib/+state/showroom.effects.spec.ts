import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ShowroomActions from './showroom.actions';
import { ShowroomEffects } from './showroom.effects';

describe('ShowroomEffects', () => {
  let actions: Observable<Action>;
  let effects: ShowroomEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ShowroomEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ShowroomEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ShowroomActions.initShowroom() });

      const expected = hot('-a-|', {
        a: ShowroomActions.loadShowroomSuccess({ showroom: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
