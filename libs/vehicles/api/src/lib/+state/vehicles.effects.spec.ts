import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as VehiclesActions from './vehicles.actions';
import { VehiclesEffects } from './vehicles.effects';

describe('VehiclesEffects', () => {
  let actions: Observable<Action>;
  let effects: VehiclesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        VehiclesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(VehiclesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: VehiclesActions.initVehicles() });

      const expected = hot('-a-|', {
        a: VehiclesActions.loadVehiclesSuccess({ vehicles: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
