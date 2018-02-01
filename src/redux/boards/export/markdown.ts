import { Exporter } from './api';
import { BoardData } from '../state';
import { BoardCards } from '../../cards';

export const markdown: Exporter = async (board: BoardData, cards: BoardCards) => {
  let s = '';
  if (board.label) {
    s += `# ${board.label}\n\n`;
  }

  Object.keys(board.categories)
    .map(id => board.categories[id])
    .sort((a, b) => a.order - b.order)
    .forEach(category => {
      s += `## ${category.label}\n\n`;
      Object.keys(cards)
        .map(id => cards[id])
        .filter(card => card.categoryId === category.id)
        .forEach(card => (s += `* ${card.content}\n`));
      s += '\n';
    });

  return { filename: `retro-${board.id}.md`, content: s, contentType: 'text/markdown' };
};
