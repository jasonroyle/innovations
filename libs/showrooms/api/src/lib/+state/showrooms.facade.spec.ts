import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as ShowroomsActions from './showrooms.actions';
import { ShowroomsEffects } from './showrooms.effects';
import { ShowroomsFacade } from './showrooms.facade';
import { ShowroomsEntity } from './showrooms.models';
import {
  SHOWROOMS_FEATURE_KEY,
  ShowroomsState,
  initialShowroomsState,
  showroomsReducer,
} from './showrooms.reducer';
import * as ShowroomsSelectors from './showrooms.selectors';

interface TestSchema {
  showrooms: ShowroomsState;
}

describe('ShowroomsFacade', () => {
  let facade: ShowroomsFacade;
  let store: Store<TestSchema>;
  const createShowroomsEntity = (id: string, name = ''): ShowroomsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SHOWROOMS_FEATURE_KEY, showroomsReducer),
          EffectsModule.forFeature([ShowroomsEffects]),
        ],
        providers: [ShowroomsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ShowroomsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allShowrooms$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allShowrooms$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadShowroomsSuccess` to manually update list
     */
    it('allShowrooms$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allShowrooms$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ShowroomsActions.loadShowroomsSuccess({
          showrooms: [
            createShowroomsEntity('AAA'),
            createShowroomsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allShowrooms$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
