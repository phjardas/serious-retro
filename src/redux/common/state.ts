export interface ErrorInfo {
  message: string;
  [key: string]: any;
}

export interface EntityPresent {
  id: string;
  state: 'present';
}

export interface EntityPending {
  id: string;
  state: 'pending';
}

export interface EntityDeleted {
  id: string;
  state: 'deleted';
}

export interface EntityFailed {
  id: string;
  state: 'failed';
  error: ErrorInfo;
}

export type Entity<T> = (EntityPresent & T) | EntityPending | EntityDeleted | EntityFailed;
