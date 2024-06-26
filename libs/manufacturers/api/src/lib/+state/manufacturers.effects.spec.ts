import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ManufacturersActions from './manufacturers.actions';
import { ManufacturersEffects } from './manufacturers.effects';

describe('ManufacturersEffects', () => {
  let actions: Observable<Action>;
  let effects: ManufacturersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ManufacturersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ManufacturersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ManufacturersActions.initManufacturers() });

      const expected = hot('-a-|', {
        a: ManufacturersActions.loadManufacturersSuccess({ manufacturers: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
