import { Entity, ErrorInfo } from '../common/state';

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
