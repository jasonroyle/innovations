# NgRx Transaction Adapter

### Dispatch

A dispatch tracks a dispatched action through to completion and provides direct accountability with relative and meaningful feedback.

When a dispatch is initiated a unique identifier is generated, this dispatch ID is then stored alongside a pending status. Once the effect of the initial action triggers a subsequent success or failure action, the dispatch is updated with the new status alongside any feedback specific to this instance.

### Transaction

A transaction can have multiple associated dispatches. The status of a transaction represents that of all associated dispatches:

- Where any dispatch fails, the transaction is failed.
- Where some dispatches are pending, the transaction is pending.
- Where all dispatches succeed, the transaction is successful.

## Store Setup

#### contact.actions.ts

```typescript
const createContact = createAction('[Contacts] Create Contact', props<DispatchProps<{ contact: Contact }>>);

const createContactSuccess = createAction('[Contacts] Create Contact Success', props<DispatchProps<{ contact: Contact }>>);

const createContactFailure = createAction('[Contacts] Create Contact Failure', props<DispatchProps<{ error: string }>>);

const clearTransaction = createAction('[Contacts] Clear Transaction', props<TransactionProps>);

const clearCompleteTransactions = createAction('[Contacts] Clear Complete Transactions');
```

#### contact.reducer.ts

```typescript
export interface SuccessFeedback {
  contact: Contact;
}

export type FailureFeedback = string;

export const contactTransactionAdapter = createTransactionAdapter<SuccessFeedback, FailureFeedback>();

const initialState = contactTransactionAdapter.getInitialState();

createReducer(
  initialState,
  on(createContact, (state, { transaction }) =>
    // Log a dispatch
    contactTransactionAdapter.pending(transaction, state)
  ),
  on(createContactSuccess, (state, { contact, transaction }) =>
    // Update the status to success
    contactTransactionAdapter.success(
      transaction, // Dispatch ID
      { contact }, // Success feedback
      { ...state, contacts: [...state.contacts, contact] }
    )
  ),
  on(createContactFailure, (state, { error, transaction }) =>
    // Updated the status to failed
    contactTransactionAdapter.failed(
      transaction, // Dispatch ID
      error, // Failure feedback
      state
    )
  ),
  on(clearTransactions, (state, { transaction }) =>
    // Clear the transaction
    contactTransactionAdapter.clear(transaction, state)
  ),
  on(clearCompleteTransactions, (state) =>
    // Clear all complete transactions
    contactTransactionAdapter.clearComplete(state)
  )
);
```

#### contact.effects.ts

```typescript
// Ensure dispatch ID propagates
createContact$ = createEffect(() =>
  this.actions$.pipe(
    ofType(createContact),
    mergeMap(({ contact, transaction }) =>
      this.contactService.createContact(contact).pipe(
        map((contact) => createContactSuccess({ contact, transaction })),
        catchError((error) => {
          console.error('Error', error);
          return of(
            createContactFailure({
              error: String(error),
              transaction,
            })
          );
        })
      )
  )
);
```

#### contact.facade.ts

```typescript
export class ContactFacade {
  // Common transaction methods
  transactions = contactTransactionAdapter.getFacade(this.store);
}
```

## Usage

### Single Dispatch

```typescript
// Create a transaction
const contactTransaction = this.contactFacade.transactions.startTransaction();

// Create a dispatch
const contactDispatch = contactTransaction.prepareDispatch();

// Subscribe to progress
contactDispatch.complete$.subscribe(({ feedback, status }) => {
  if (status === TransactionStatus.Success) {
    alert('Successfully created ${feedback.contact.name}!');
  } else {
    console.error(contactDispatch.combinedId, feedback);
  }
});

// Dispatch the action
contactDispatch.dispatch(this.contactFacade.actions.createContact(contactDispatch.props({ name: 'Joe' })));

// Dispatched action
contactTransaction.ready(
  // Clear transaction upon completion
  this.contactFacade.actions.clearTransaction(contactTransaction.props({}))
);
```

### Multiple Dispatches

```typescript
// Create a transaction
const contactTransaction = this.contactFacade.transactions.startTransaction();

// Subscribe to progress
contactTransaction.status$.subscribe(transaction =>
  const { progress, status } = transaction;

  // Update progress
  this.progress = progress;

  if (status === TransactionStatus.Success) {
    alert('Successfully created all contacts!');
  } else if (status === TransactionStatus.Failed) {
    const { feedback } = transaction;
    for (let dispatchId in feedback) {
      const failedDispatch = contactTransaction.getDispatch(dispatchId);
      console.error(failedDispatch.combinedId, feedback[dispatchId]);
    }
  }
);

// Dispatch 10 actions in a single transaction
for (let i = 0; i < 10; i++) {
  // Create a dispatch
  const contactDispatch = contactTransaction.prepareDispatch();

  // Dispatch the action
  contactDispatch.dispatch(
    this.contactFacade.actions.createContact(
      contactDispatch.props({ name: `Joe ${i}` })
    )
  );
}

// All actions dispatched
contactTransaction.ready(
  // Clear transaction upon completion
  this.contactFacade.actions.clearTransaction(contactTransaction.props({}))
);
```

### Queued Dispatches

Dispatches are queued by default and released when all actions have been registered and `ready` is called on the transaction.

To disable queuing and dispatch actions straight away, set `queue` to `false` when creating a transaction.

```typescript
// Disable queuing
const contactTransaction = this.contactFacade.transactions.startTransaction(false);

const contactDispatch = contactTransaction.prepareDispatch();

contactTransaction.complete$.subscribe(({ status }) => {
  if (status === TransactionStatus.Success) {
    // Do next thing
  }
});

// Dispatch instantly
contactDispatch.dispatch(this.contactFacade.actions.createContact(contactDispatch.props({ name: 'Joe' })));

contactTransaction.ready(this.contactFacade.actions.clearCompleteTransactions());
```

## API

### Dispatch

```typescript
class Dispatch
```

#### Properties

| Name                                                        | Description                                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `action: Action`                                            | Action to dispatch.                                                                   |
| `combinedId: string`                                        | Combined transaction and dispatch IDs.                                                |
| `complete$: Observable<DispatchStatusSelection>`            | Emits final status upon completion.                                                   |
| `id: string`                                                | Dispatch ID.                                                                          |
| `status$: Observable<DispatchStatusSelection>`              | Progress updates.                                                                     |
| `dispatch(action: Action, onCompleteAction?: Action): void` | Register an action to be dispatched upon completion, and dispatch or queue an action. |

### Transaction

```typescript
class Transaction
```

#### Properties

| Name                                                | Default | Description                                                                                                       |
| --------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `complete$: Observable<TransactionStatusSelection>` |         | Emits final status upon completion.                                                                               |
| `getDispatch(dispatchId: string): Dispatch`         |         | Get dispatch by ID.                                                                                               |
| `id: string`                                        |         | Transaction ID.                                                                                                   |
| `prepareDispatch(): Dispatch`                       |         | Create an associated dispatch.                                                                                    |
| `props(props: P): TransactionProps<P>`              |         | Compile transaction props.                                                                                        |
| `queue: boolean`                                    | `true`  | Hold dispatches until ready.                                                                                      |
| `ready(onCompleteAction?: Action): void`            |         | Register an action to be dispatched upon completion, release dispatches if queued, and connect status observable. |
| `status$: Connectable<TransactionStatusSelection>`  |         | Progress updates.                                                                                                 |

### Transaction Adapter

```typescript
class TransactionAdapter
```

#### Properties _Extends: `TransactionStateAdapter`_

| Name                                                                                                                      | Description                                                          |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `collateFeedback(transactions: DispatchSelection, status: CompleteTransactionStatus): TransactionStatusFeedbackSelection` | Collates a record of dispatch IDs and feedback for the given status. |
| `getFacade(store: Store<State>, selectState?: (state: State) => TransactionsState): TransactionFacadeAdapter`             | Create a transaction facade.                                         |
| `getInitialState(state?: State): TransactionsState`                                                                       | Get the initial transaction state.                                   |
| `getSelectors(selectState?: (state: State) => TransactionsState): TransactionSelectors`                                   | Get transaction selectors.                                           |

### Transaction Facade Adapter

```typescript
class TransactionFacadeAdapter
```

#### Properties

| Name                                             | Description           |
| ------------------------------------------------ | --------------------- |
| `startTransaction(queue?: boolean): Transaction` | Create a transaction. |

### Transaction State Adapter

```typescript
class TransactionStateAdapter
```

#### Properties

| Name                                                                                                           | Description                                 |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `add(transaction: DispatchId, state: State): State`                                                            | Log a new dispatch.                         |
| `clear(transactionId: TransactionId \| string, state: State): State`                                           | Clear a transaction.                        |
| `clearAll(state: State): State`                                                                                | Clear all transactions.                     |
| `clearComplete(state: State): State`                                                                           | Clear complete transactions.                |
| `clearDispatch(dispatchId: DispatchId \| string, state: State): State`                                         | Clear a dispatch.                           |
| `failed(dispatchId: DispatchId \| string, feedback: Feedback, state: State): State`                            | Update the status of a dispatch to failed.  |
| `pending(dispatchId: DispatchId \| string, state: State): State`                                               | Log a new dispatch.                         |
| `success(dispatchId: DispatchId \| string, feedback: Feedback, state: State): State`                           | Update the status of a dispatch to success. |
| `update(dispatchId: DispatchId \| string, status: TransactionStatus, feedback: Feedback, state: State): State` | Update the status of a dispatch.            |
