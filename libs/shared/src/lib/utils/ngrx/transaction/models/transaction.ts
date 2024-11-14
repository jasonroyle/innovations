export interface TransactionId {
  transactionId: string;
}

export interface DispatchId extends TransactionId {
  dispatchId: string;
}

export interface TransactionOptions {
  queue?: boolean;
}

export enum TransactionStatus {
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export type CompleteTransactionStatus =
  | TransactionStatus.Success
  | TransactionStatus.Failed;
