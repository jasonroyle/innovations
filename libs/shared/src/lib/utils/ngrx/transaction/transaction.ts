import { Action, Store, select } from '@ngrx/store';
import {
  Connectable,
  Observable,
  Subject,
  connectable,
  delay,
  takeUntil,
} from 'rxjs';

import { CompleteTransaction } from './complete-transaction';
import { DispatchProps, TransactionProps } from './models/action';
import {
  CompleteDispatchStatusSelection,
  CompleteTransactionStatusSelection,
  DispatchStatusSelection,
  TransactionSelectors,
  TransactionStatusSelection,
} from './models/selector';
import { TransactionOptions } from './models/transaction';

export class Transaction<State, SuccessFeedback, FailureFeedback> {
  private readonly _complete$ = new Subject<
    CompleteTransactionStatusSelection<SuccessFeedback, FailureFeedback>
  >();
  private _onCompleteAction?: Action;
  private _ready = false;
  private readonly _dispatches = new Map<
    string,
    Dispatch<State, SuccessFeedback, FailureFeedback>
  >();
  readonly complete$: Observable<
    CompleteTransactionStatusSelection<SuccessFeedback, FailureFeedback>
  >;
  readonly id = self.crypto.randomUUID();
  readonly queue;
  readonly status$: Connectable<
    TransactionStatusSelection<SuccessFeedback, FailureFeedback>
  >;

  constructor(
    private readonly _store: Store<State>,
    private readonly _selectors: TransactionSelectors<
      State,
      SuccessFeedback,
      FailureFeedback
    >,
    options: TransactionOptions = {}
  ) {
    this.queue = options.queue ?? true;
    this.complete$ = this._complete$.asObservable();
    this.status$ = connectable(
      this._store.pipe(
        select(this._selectors.selectTransactionStatus(this.id)),
        takeUntil(this.complete$)
      )
    );
    this.status$.pipe(delay(0)).subscribe((status) => {
      if (CompleteTransaction.isCompleteTransactionStatusSelection(status)) {
        this._complete$.next(status);
        this._complete$.complete();
        if (this._onCompleteAction) {
          this._store.dispatch(this._onCompleteAction);
        }
      }
    });
  }

  /**
   * Get a dispatch by ID.
   * @param dispatchId Dispatch ID
   * @returns Dispatch
   */
  getDispatch(
    dispatchId: string
  ): Dispatch<State, SuccessFeedback, FailureFeedback> | undefined {
    return this._dispatches.get(dispatchId);
  }

  /**
   * Create a dispatch.
   * @returns Dispatch
   */
  prepareDispatch(): Dispatch<State, SuccessFeedback, FailureFeedback> {
    if (this._ready) throw `Transaction already dispatched: ${this.id}`;
    const dispatch = new Dispatch(this, this._store, this._selectors);
    this._dispatches.set(dispatch.id, dispatch);
    return dispatch;
  }

  /**
   * Compile transaction properties.
   * @param props Action properties
   * @returns Action properties & transaction properties
   */
  props<P extends object>(props: P): TransactionProps<P> {
    return { ...props, transaction: { transactionId: this.id } };
  }

  /**
   * Call once all actions are dispatched.
   * @param onCompleteAction Action, dispatched on completion of the transaction
   */
  ready(onCompleteAction?: Action): void {
    if (this._ready) throw `Transaction already ready: ${this.id}`;
    this._ready = true;
    this._onCompleteAction = onCompleteAction;
    if (this.queue) {
      this._dispatches.forEach(
        ({ action }) => action && this._store.dispatch(action)
      );
    }
    this.status$.connect();
  }
}

export class Dispatch<State, SuccessFeedback, FailureFeedback> {
  private _action?: Action;
  private readonly _complete$ = new Subject<
    CompleteDispatchStatusSelection<SuccessFeedback, FailureFeedback>
  >();
  private _onCompleteAction?: Action;
  private _ready = false;
  readonly complete$: Observable<
    CompleteDispatchStatusSelection<SuccessFeedback, FailureFeedback>
  >;
  readonly id = self.crypto.randomUUID();
  readonly status$: Observable<
    DispatchStatusSelection<SuccessFeedback, FailureFeedback>
  >;

  get action(): Action | undefined {
    return this._action;
  }

  /**
   * Combined transaction and dispatch IDs.
   *
   * {transactionId}:{dispatchId}
   */
  get combinedId(): string {
    return `${this.transaction.id}:${this.id}`;
  }

  constructor(
    public readonly transaction: Transaction<
      State,
      SuccessFeedback,
      FailureFeedback
    >,
    private readonly _store: Store<State>,
    private readonly _selectors: TransactionSelectors<
      State,
      SuccessFeedback,
      FailureFeedback
    >
  ) {
    this.complete$ = this._complete$.asObservable();
    this.status$ = this._store.pipe(
      select(this._selectors.selectDispatchStatus(this.id)),
      takeUntil(this.complete$)
    );
    this.status$.pipe(delay(0)).subscribe((status) => {
      if (CompleteTransaction.isCompleteDispatchStatusSelection(status)) {
        this._complete$.next(status);
        this._complete$.complete();
        if (this._onCompleteAction) {
          this._store.dispatch(this._onCompleteAction);
        }
      }
    });
  }

  /**
   * Dispatch an action
   * @param action Action
   * @param onCompleteAction Action, dispatched on completion of the dispatch
   */
  dispatch(action: Action, onCompleteAction?: Action): void {
    if (this._ready) throw `Dispatch already ready: ${this.combinedId}`;
    this._ready = true;
    this._action = action;
    this._onCompleteAction = onCompleteAction;
    if (this.transaction.queue) return;
    this._store.dispatch(action);
  }

  /**
   * Compile dispatch properties.
   * @param props Action properties
   * @returns Action properties & dispatch properties
   */
  props<P extends object>(props: P): DispatchProps<P> {
    return {
      ...props,
      transaction: {
        dispatchId: this.id,
        transactionId: this.transaction.id,
      },
    };
  }
}
