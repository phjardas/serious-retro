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
}

export interface BoardData {
  createdAt: Date;
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
}

export interface Card {
  id: string;
  categoryId: string;
  content: string;
  createdAt: Date;
}

export interface BoardCards {
  [cardId: string]: Card;
}

export interface Cards {
  [boardId: string]: BoardCards;
}

export interface State {
  boards: Boards;
  cards: Cards;
}
