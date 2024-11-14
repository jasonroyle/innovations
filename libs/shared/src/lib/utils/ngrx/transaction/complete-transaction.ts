import {
  CompleteDispatchStatusSelection,
  CompleteTransactionStatusSelection,
  DispatchStatusSelection,
  TransactionStatusSelection,
} from './models/selector';
import { CompleteTransactionState, TransactionState } from './models/state';
import {
  CompleteTransactionStatus,
  TransactionStatus,
} from './models/transaction';

export class CompleteTransaction {
  static readonly statuses = [
    TransactionStatus.Success,
    TransactionStatus.Failed,
  ] as const;

  static isComplete<SuccessFeedback, FailureFeedback>(
    transaction: TransactionState<SuccessFeedback, FailureFeedback>
  ): transaction is CompleteTransactionState<SuccessFeedback, FailureFeedback> {
    return CompleteTransaction.isCompleteStatus(transaction.status);
  }

  static isCompleteDispatchStatusSelection<SuccessFeedback, FailureFeedback>(
    status: DispatchStatusSelection<SuccessFeedback, FailureFeedback>
  ): status is CompleteDispatchStatusSelection<
    SuccessFeedback,
    FailureFeedback
  > {
    return CompleteTransaction.isCompleteStatus(status.status);
  }

  static isCompleteStatus(
    status: TransactionStatus
  ): status is CompleteTransactionStatus {
    for (const completeStatus of CompleteTransaction.statuses) {
      if (status === completeStatus) return true;
    }
    return false;
  }

  static isCompleteTransactionStatusSelection<SuccessFeedback, FailureFeedback>(
    status: TransactionStatusSelection<SuccessFeedback, FailureFeedback>
  ): status is CompleteTransactionStatusSelection<
    SuccessFeedback,
    FailureFeedback
  > {
    return CompleteTransaction.isCompleteStatus(status.status);
  }
}
