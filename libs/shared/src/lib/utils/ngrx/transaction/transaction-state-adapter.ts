import { CompleteTransaction } from './complete-transaction';
import { TransactionsState } from './models/state';
import {
  DispatchId,
  TransactionId,
  TransactionStatus,
} from './models/transaction';

export class TransactionStateAdapter<SuccessFeedback, FailureFeedback> {
  /**
   * Log a new dispatch.
   * @param transaction Dispatch ID
   * @param state State
   * @returns State
   */
  add<State extends TransactionsState<SuccessFeedback, FailureFeedback>>(
    transaction: DispatchId,
    state: State
  ): State {
    return {
      ...state,
      transactions: [
        ...state.transactions,
        { status: TransactionStatus.Pending, transaction },
      ],
    };
  }

  /**
   * Clear a transaction.
   * @param transactionId Transaction ID
   * @param state State
   * @returns State
   */
  clear<State extends TransactionsState<SuccessFeedback, FailureFeedback>>(
    transactionId: TransactionId | string,
    state: State
  ): State {
    if (typeof transactionId !== 'string') {
      transactionId = transactionId.transactionId;
    }
    return {
      ...state,
      transactions: state.transactions.filter(
        ({ transaction }) => transaction.transactionId !== transactionId
      ),
    };
  }

  /**
   * Clear all transactions.
   * @param state State
   * @returns State
   */
  clearAll<State extends TransactionsState<SuccessFeedback, FailureFeedback>>(
    state: State
  ): State {
    return {
      ...state,
      transactions: [],
    };
  }

  /**
   * Clear complete transactions.
   * @param state State
   * @returns State
   */
  clearComplete<
    State extends TransactionsState<SuccessFeedback, FailureFeedback>
  >(state: State): State {
    const { transactions } = state;
    const statuses = transactions.reduce((statuses, transaction) => {
      const transactionId = transaction.transaction.transactionId;
      return statuses.set(
        transactionId,
        statuses.get(transactionId) === false
          ? false
          : CompleteTransaction.isComplete(transaction)
      );
    }, new Map<string, boolean>());
    return {
      ...state,
      transactions: transactions.filter(
        ({ transaction: { transactionId } }) => !statuses.get(transactionId)
      ),
    };
  }

  /**
   * Clear a dispatch.
   * @param transactionDispatchId Dispatch ID
   * @param state State
   * @returns State
   */
  clearDispatch<
    State extends TransactionsState<SuccessFeedback, FailureFeedback>
  >(dispatchId: DispatchId | string, state: State): State {
    if (typeof dispatchId !== 'string') dispatchId = dispatchId.dispatchId;
    return {
      ...state,
      transactions: state.transactions.filter(
        ({ transaction }) => transaction.dispatchId !== dispatchId
      ),
    };
  }

  /**
   * Update the status of a dispatch.
   * @param dispatchId Dispatch ID
   * @param status Status
   * @param feedback Feedback
   * @param state State
   * @returns State
   */
  updateStatus<
    State extends TransactionsState<SuccessFeedback, FailureFeedback>
  >(
    dispatchId: DispatchId | string,
    status: TransactionStatus.Failed,
    feedback: FailureFeedback,
    state: State
  ): State;
  updateStatus<
    State extends TransactionsState<SuccessFeedback, FailureFeedback>
  >(
    dispatchId: DispatchId | string,
    status: TransactionStatus.Success,
    feedback: SuccessFeedback,
    state: State
  ): State;
  updateStatus<
    State extends TransactionsState<SuccessFeedback, FailureFeedback>
  >(
    dispatchId: DispatchId | string,
    status: TransactionStatus,
    feedback: FailureFeedback | SuccessFeedback,
    state: State
  ): State {
    if (typeof dispatchId !== 'string') dispatchId = dispatchId.dispatchId;
    const transactions = [...state.transactions];
    const transactionIndex = transactions.findIndex(
      ({ transaction }) => transaction.dispatchId === dispatchId
    );
    if (transactionIndex < 0) return state;
    const [transaction] = transactions.splice(transactionIndex, 1);
    return {
      ...state,
      transactions: [...transactions, { ...transaction, feedback, status }],
    };
  }
}
