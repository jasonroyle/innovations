import { DispatchId, TransactionId } from './transaction';

export type TransactionProps<T = object> = T & {
  transaction: TransactionId;
};

export type DispatchProps<T = object> = T & {
  transaction: DispatchId;
};
