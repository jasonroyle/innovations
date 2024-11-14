import { Store } from '@ngrx/store';

import { TransactionSelectors } from './models/selector';
import { TransactionOptions } from './models/transaction';
import { Transaction } from './transaction';

export class TransactionFacadeAdapter<State, SuccessFeedback, FailureFeedback> {
  constructor(
    private _store: Store<State>,
    private _selectors: TransactionSelectors<
      State,
      SuccessFeedback,
      FailureFeedback
    >
  ) {}

  /**
   * Create a transaction.
   * @returns Transaction
   */
  startTransaction(
    options?: TransactionOptions
  ): Transaction<State, SuccessFeedback, FailureFeedback> {
    return new Transaction(this._store, this._selectors, options);
  }
}
