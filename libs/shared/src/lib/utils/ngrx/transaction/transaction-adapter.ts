import { Store, createSelector } from '@ngrx/store';

import { CompleteTransaction } from './complete-transaction';
import {
  DispatchSelection,
  DispatchStatusSelection,
  TransactionSelection,
  TransactionSelectors,
  TransactionStatusFeedbackSelection,
  TransactionStatusSelection,
} from './models/selector';
import { TransactionState, TransactionsState } from './models/state';
import {
  CompleteTransactionStatus,
  TransactionStatus,
} from './models/transaction';
import { TransactionFacadeAdapter } from './transaction-facade-adapter';
import { TransactionStateAdapter } from './transaction-state-adapter';

export class TransactionAdapter<
  SuccessFeedback,
  FailureFeedback
> extends TransactionStateAdapter<SuccessFeedback, FailureFeedback> {
  collateFeedback<SuccessFeedback, FailureFeedback>(
    transactions: DispatchSelection<SuccessFeedback, FailureFeedback>[],
    status: TransactionStatus.Success
  ): TransactionStatusFeedbackSelection<SuccessFeedback>;
  collateFeedback<SuccessFeedback, FailureFeedback>(
    transactions: DispatchSelection<SuccessFeedback, FailureFeedback>[],
    status: TransactionStatus.Failed
  ): TransactionStatusFeedbackSelection<FailureFeedback>;
  collateFeedback<
    SuccessFeedback,
    FailureFeedback,
    Status extends CompleteTransactionStatus
  >(
    transactions: DispatchSelection<SuccessFeedback, FailureFeedback>[],
    status: Status
  ): TransactionStatusFeedbackSelection<SuccessFeedback | FailureFeedback> {
    return transactions.reduce<
      TransactionStatusFeedbackSelection<SuccessFeedback | FailureFeedback>
    >((feedbackMap, transaction) => {
      if (transaction.status !== status) return feedbackMap;
      const {
        feedback,
        transaction: { dispatchId },
      } = transaction;
      return {
        ...feedbackMap,
        [dispatchId]: feedback,
      };
    }, {});
  }

  getFacade<State extends TransactionsState<SuccessFeedback, FailureFeedback>>(
    store: Store<State>
  ): TransactionFacadeAdapter<State, SuccessFeedback, FailureFeedback>;
  getFacade<State>(
    store: Store<State>,
    selectState: (
      state: State
    ) => TransactionsState<SuccessFeedback, FailureFeedback>
  ): TransactionFacadeAdapter<State, SuccessFeedback, FailureFeedback>;
  getFacade<State>(
    store:
      | Store<State>
      | Store<TransactionsState<SuccessFeedback, FailureFeedback>>,
    selectState?: (
      state: State
    ) => TransactionsState<SuccessFeedback, FailureFeedback>
  ):
    | TransactionFacadeAdapter<State, SuccessFeedback, FailureFeedback>
    | TransactionFacadeAdapter<
        TransactionsState<SuccessFeedback, FailureFeedback>,
        SuccessFeedback,
        FailureFeedback
      > {
    if (selectState) {
      return new TransactionFacadeAdapter(
        store as Store<State>,
        this.getSelectors(selectState)
      );
    }
    return new TransactionFacadeAdapter(
      store as Store<TransactionsState<SuccessFeedback, FailureFeedback>>,
      this.getSelectors()
    );
  }

  getInitialState(): TransactionsState<SuccessFeedback, FailureFeedback>;
  getInitialState<State>(
    state: State
  ): State & TransactionsState<SuccessFeedback, FailureFeedback>;
  getInitialState<State>(
    state?: State
  ): TransactionsState<SuccessFeedback, FailureFeedback> {
    return {
      transactions: [],
      ...(state ?? {}),
    };
  }

  getSelectors(): TransactionSelectors<
    TransactionsState<SuccessFeedback, FailureFeedback>,
    SuccessFeedback,
    FailureFeedback
  >;
  getSelectors<State>(
    selectState: (
      state: State
    ) => TransactionsState<SuccessFeedback, FailureFeedback>
  ): TransactionSelectors<State, SuccessFeedback, FailureFeedback>;
  getSelectors<State>(
    selectState?: (
      state: State
    ) => TransactionsState<SuccessFeedback, FailureFeedback>
  ):
    | TransactionSelectors<State, SuccessFeedback, FailureFeedback>
    | TransactionSelectors<
        TransactionsState<SuccessFeedback, FailureFeedback>,
        SuccessFeedback,
        FailureFeedback
      > {
    const selectTransactions = (
      state: TransactionsState<SuccessFeedback, FailureFeedback>
    ): TransactionState<SuccessFeedback, FailureFeedback>[] =>
      state.transactions;
    const selectDispatch = (dispatchId: string) =>
      createSelector(
        selectTransactions,
        (
          transactions
        ): TransactionState<SuccessFeedback, FailureFeedback> | undefined =>
          transactions.find(
            ({ transaction }) => transaction.dispatchId === dispatchId
          )
      );
    const selectDispatchStatus = (dispatchId: string) =>
      createSelector(
        selectDispatch(dispatchId),
        (
          dispatch
        ): DispatchStatusSelection<SuccessFeedback, FailureFeedback> => {
          if (dispatch) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { transaction, ...dispatchStatus } = dispatch;
            return dispatchStatus;
          }
          return { status: TransactionStatus.Pending };
        }
      );
    const selectTransaction = (transactionId: string) =>
      createSelector(
        selectTransactions,
        (
          transactions
        ): TransactionSelection<SuccessFeedback, FailureFeedback> => {
          transactions = transactions.filter(
            ({ transaction }) => transaction.transactionId === transactionId
          );
          return {
            transactions,
            status: transactions?.some(
              ({ status }) => status === TransactionStatus.Failed
            )
              ? TransactionStatus.Failed
              : transactions?.every(
                  ({ status }) => status === TransactionStatus.Success
                )
              ? TransactionStatus.Success
              : TransactionStatus.Pending,
          };
        }
      );
    const selectTransactionStatus = (transactionId: string) =>
      createSelector(
        selectTransaction(transactionId),
        ({
          transactions,
          status,
        }): TransactionStatusSelection<SuccessFeedback, FailureFeedback> => {
          const progress = transactions.length
            ? transactions.filter((dispatch) =>
                CompleteTransaction.isComplete(dispatch)
              ).length / transactions.length
            : 0;
          if (status === TransactionStatus.Success) {
            return {
              feedback: this.collateFeedback(transactions, status),
              progress,
              status,
            };
          } else if (status === TransactionStatus.Failed) {
            return {
              feedback: this.collateFeedback(transactions, status),
              progress,
              status,
            };
          }
          return { progress, status };
        }
      );
    if (!selectState) {
      return {
        selectDispatch,
        selectDispatchStatus,
        selectTransaction,
        selectTransactionStatus,
      };
    }
    return {
      selectDispatch: (dispatchId: string) =>
        createSelector(selectState, selectDispatch(dispatchId)),
      selectDispatchStatus: (dispatchId: string) =>
        createSelector(selectState, selectDispatchStatus(dispatchId)),
      selectTransaction: (transactionId: string) =>
        createSelector(selectState, selectTransaction(transactionId)),
      selectTransactionStatus: (transactionId: string) =>
        createSelector(selectState, selectTransactionStatus(transactionId)),
    };
  }
}

export function createTransactionAdapter<
  SuccessFeedback,
  FailureFeedback
>(): TransactionAdapter<SuccessFeedback, FailureFeedback> {
  return new TransactionAdapter();
}
