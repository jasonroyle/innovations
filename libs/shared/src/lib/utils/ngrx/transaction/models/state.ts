import { DispatchId, TransactionStatus } from './transaction';

export interface TransactionStateBase {
  transaction: DispatchId;
}

export interface TransactionPendingState extends TransactionStateBase {
  status: TransactionStatus.Pending;
}

export interface TransactionSuccessState<Feedback>
  extends TransactionStateBase {
  /**
   * Data associated with the successful dispatch.
   */
  feedback: Feedback;
  status: TransactionStatus.Success;
}

export interface TransactionFailedState<Feedback> extends TransactionStateBase {
  /**
   * Data associated with the failed dispatch.
   */
  feedback: Feedback;
  status: TransactionStatus.Failed;
}

export type CompleteTransactionState<SuccessFeedback, FailureFeedback> =
  | TransactionSuccessState<SuccessFeedback>
  | TransactionFailedState<FailureFeedback>;

export type TransactionState<SuccessFeedback, FailureFeedback> =
  | TransactionPendingState
  | CompleteTransactionState<SuccessFeedback, FailureFeedback>;

export interface TransactionsState<SuccessFeedback, FailureFeedback> {
  transactions: TransactionState<SuccessFeedback, FailureFeedback>[];
}
