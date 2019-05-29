import { Boards } from './boards';
import { Cards } from './cards';
import { User } from './user';

export interface State {
  user: User | null;
  boards: Boards;
  cards: Cards;
}
