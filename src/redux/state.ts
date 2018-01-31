export interface ErrorInfo {
  message: string;
  [key: string]: any;
}

interface EntityPresent {
  id: string;
  state: 'present';
}

interface EntityPending {
  id: string;
  state: 'pending';
}

interface EntityDeleted {
  id: string;
  state: 'deleted';
}

interface EntityFailed {
  id: string;
  state: 'failed';
  error: ErrorInfo;
}

export interface BoardData extends EntityPresent {
  createdAt: Date;
}

export type Board = BoardData | EntityPending | EntityDeleted | EntityFailed;

export interface BoardCreation {
  pending: boolean;
  id?: string;
  error?: ErrorInfo;
}

export interface Boards {
  creation?: BoardCreation;
  items: { [id: string]: Board };
}

export interface State {
  boards: Boards;
}
