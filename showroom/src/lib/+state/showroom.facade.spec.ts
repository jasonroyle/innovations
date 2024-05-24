import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as ShowroomActions from './showroom.actions';
import { ShowroomEffects } from './showroom.effects';
import { ShowroomFacade } from './showroom.facade';
import { ShowroomEntity } from './showroom.models';
import {
  SHOWROOM_FEATURE_KEY,
  ShowroomState,
  initialShowroomState,
  showroomReducer,
} from './showroom.reducer';
import * as ShowroomSelectors from './showroom.selectors';

interface TestSchema {
  showroom: ShowroomState;
}

describe('ShowroomFacade', () => {
  let facade: ShowroomFacade;
  let store: Store<TestSchema>;
  const createShowroomEntity = (id: string, name = ''): ShowroomEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SHOWROOM_FEATURE_KEY, showroomReducer),
          EffectsModule.forFeature([ShowroomEffects]),
        ],
        providers: [ShowroomFacade],
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
      facade = TestBed.inject(ShowroomFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allShowroom$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allShowroom$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadShowroomSuccess` to manually update list
     */
    it('allShowroom$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allShowroom$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ShowroomActions.loadShowroomSuccess({
          showroom: [createShowroomEntity('AAA'), createShowroomEntity('BBB')],
        })
      );

      list = await readFirst(facade.allShowroom$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
