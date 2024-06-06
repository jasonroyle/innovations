import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

interface StoreHydrationOptions {
  storage?: Storage;
}

export class StoreHydration<State = unknown> {
  private readonly _storage: Storage = window.sessionStorage;

  constructor(options: StoreHydrationOptions = {}) {
    const { storage } = options;
    if (storage) this._storage = storage;
  }

  public readonly createReducer = (
    reducer: ActionReducer<State>
  ): ActionReducer<State> => {
    return (state, action) => {
      const key = reducer.name;
      if (action.type === INIT || action.type === UPDATE) {
        const serializedState = this._storage.getItem(key);
        if (serializedState) {
          try {
            return JSON.parse(serializedState);
          } catch (err) {
            console.error(err);
            this._storage.removeItem(key);
          }
        }
      }
      const nextState = reducer(state, action);
      this._storage.setItem(key, JSON.stringify(nextState));
      return nextState;
    };
  };
}