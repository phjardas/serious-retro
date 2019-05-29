import { Exporter, Export } from './api';
import { BoardData } from '../state';
import { BoardCards } from '../../cards';

import { html } from './html';
import { markdown } from './markdown';

const exporters: { [id: string]: Exporter } = { html, markdown };

export function exportBoard(exporter: string, board: BoardData, cards: BoardCards): Promise<Export> {
  return exporters[exporter](board, cards);
}

export * from './api';
