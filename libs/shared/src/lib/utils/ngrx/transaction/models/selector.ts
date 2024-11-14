import {
  TransactionFailedState,
  TransactionPendingState,
  TransactionSuccessState,
} from './state';
import { TransactionStatus } from './transaction';

// Dispatch selection

export type CompleteDispatchSelection<SuccessFeedback, FailureFeedback> =
  | TransactionSuccessState<SuccessFeedback>
  | TransactionFailedState<FailureFeedback>;

export type DispatchSelection<SuccessFeedback, FailureFeedback> =
  | CompleteDispatchSelection<SuccessFeedback, FailureFeedback>
  | TransactionPendingState;

// Transaction selection

export interface TransactionSelection<SuccessFeedback, FailureFeedback> {
  transactions: DispatchSelection<SuccessFeedback, FailureFeedback>[];
  status: TransactionStatus;
}

// Dispatch status selection

export interface DispatchStatusSelectionBase {
  status: TransactionStatus;
}

export interface DispatchPendingStatusSelection
  extends DispatchStatusSelectionBase {
  status: TransactionStatus.Pending;
}

export interface DispatchSuccessStatusSelection<SuccessFeedback>
  extends DispatchStatusSelectionBase {
  /**
   * Data associated with the successful transaction dispatch.
   */
  feedback: SuccessFeedback;
  status: TransactionStatus.Success;
}

export interface DispatchFailureStatusSelection<FailureFeedback>
  extends DispatchStatusSelectionBase {
  /**
   * Data associated with the failed transaction dispatch.
   */
  feedback: FailureFeedback;
  status: TransactionStatus.Failed;
}

export type CompleteDispatchStatusSelection<SuccessFeedback, FailureFeedback> =
  | DispatchSuccessStatusSelection<SuccessFeedback>
  | DispatchFailureStatusSelection<FailureFeedback>;

export type DispatchStatusSelection<SuccessFeedback, FailureFeedback> =
  | CompleteDispatchStatusSelection<SuccessFeedback, FailureFeedback>
  | DispatchPendingStatusSelection;

// Transaction status selection

export type TransactionStatusFeedbackSelection<Feedback> = Record<
  string,
  Feedback
>;

export interface TransactionStatusSelectionBase {
  /**
   * Progress of the transaction.
   *
   * 0-1
   */
  progress: number;
  status: TransactionStatus;
}

export interface TransactionPendingStatusSelection
  extends TransactionStatusSelectionBase {
  status: TransactionStatus.Pending;
}

export interface TransactionSuccessStatusSelection<SuccessFeedback>
  extends TransactionStatusSelectionBase {
  /**
   * Data associated with the successful transaction, mapped to transaction dispatch IDs.
   */
  feedback: TransactionStatusFeedbackSelection<SuccessFeedback>;
  status: TransactionStatus.Success;
}

export interface TransactionFailedStatusSelection<FailureFeedback>
  extends TransactionStatusSelectionBase {
  /**
   * Data associated with the failed transaction, mapped to transaction dispatch IDs.
   */
  feedback: TransactionStatusFeedbackSelection<FailureFeedback>;
  status: TransactionStatus.Failed;
}

export type CompleteTransactionStatusSelection<
  SuccessFeedback,
  FailureFeedback
> =
  | TransactionSuccessStatusSelection<SuccessFeedback>
  | TransactionFailedStatusSelection<FailureFeedback>;

export type TransactionStatusSelection<SuccessFeedback, FailureFeedback> =
  | CompleteTransactionStatusSelection<SuccessFeedback, FailureFeedback>
  | TransactionPendingStatusSelection;

// Transaction selectors

export interface TransactionSelectors<State, SuccessFeedback, FailureFeedback> {
  /**
   * Select a dispatch by ID.
   * @param dispatchId Dispatch ID
   * @returns Dispatch
   */
  selectDispatch: (
    dispatchId: string
  ) => (
    state: State
  ) => DispatchSelection<SuccessFeedback, FailureFeedback> | undefined;

  /**
   * Select the status of a dispatch by ID.
   * @param dispatchId Dispatch ID
   * @returns Status
   */
  selectDispatchStatus: (
    dispatchId: string
  ) => (
    state: State
  ) => DispatchStatusSelection<SuccessFeedback, FailureFeedback>;

  /**
   * Select a transaction by ID.
   * @param transactionId Transaction ID
   * @returns Transaction
   */
  selectTransaction: (
    transactionId: string
  ) => (state: State) => TransactionSelection<SuccessFeedback, FailureFeedback>;

  /**
   * Select the status of a transaction by ID.
   * @param transactionId Transaction ID
   * @returns Status
   */
  selectTransactionStatus: (
    transactionId: string
  ) => (
    state: State
  ) => TransactionStatusSelection<SuccessFeedback, FailureFeedback>;
}
