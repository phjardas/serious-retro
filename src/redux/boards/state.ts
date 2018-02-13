import { Entity, ErrorInfo } from '../common/state';
import { User } from '../user/state';

export type ParticipationType = 'owner' | 'participant';

export interface Category {
  id: string;
  label: string;
  order: number;
  color: 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey' | 'black';
}

export type BoardCategories = { [id: string]: Category };

export interface BoardParticipant extends User {
  role: ParticipationType;
}

export type BoardParticipants = { [userId: string]: BoardParticipant };

export interface BoardData {
  id?: string;
  createdAt: Date;
  label?: string;
  categories: BoardCategories;
  participants: BoardParticipants;
  role: ParticipationType;
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
  mine: { [id: string]: ParticipationType };
}
