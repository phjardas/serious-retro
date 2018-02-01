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

type Entity<T> = (EntityPresent & T) | EntityPending | EntityDeleted | EntityFailed;

export interface Category {
  id: string;
  label: string;
  color: 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey' | 'black';
}

export interface BoardData {
  createdAt: Date;
  owner: string;
  categories: Category[];
}

export type Board = Entity<BoardData>;

export interface BoardCreation {
  pending: boolean;
  id?: string;
  error?: ErrorInfo;
}

export interface Boards {
  creation?: BoardCreation;
  items: { [id: string]: Board };
  owned: { [id: string]: true };
}

export interface Card {
  id: string;
  categoryId: string;
  content: string;
  createdAt: Date;
  owner: string;
  editedBy?: string;
  editing?: boolean;
  mine?: boolean;
}

export interface BoardCards {
  [cardId: string]: Card;
}

export interface Cards {
  [boardId: string]: BoardCards;
}

export interface User {
  id: string;
}

export interface State {
  user: User | null;
  boards: Boards;
  cards: Cards;
}
