import { BoardData } from '../state';
import { BoardCards } from '../../cards';

export interface Export {
  filename: string;
  contentType: string;
  content: any;
}

export interface Exporter {
  (board: BoardData, cards: BoardCards): Promise<Export>;
}
