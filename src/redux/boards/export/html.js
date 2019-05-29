import { Exporter } from './api';
import { BoardData } from '../state';
import { BoardCards } from '../../cards';

export const html: Exporter = async (board: BoardData, cards: BoardCards) => {
  const s = `<!doctype html>
  <html>
  <head>
    <title>${board.label || 'Retrospective'}</title>
  </head>
  <body>
    <h1>${board.label || 'Retrospective'}</h1>
    ${Object.keys(board.categories)
      .map(id => board.categories[id])
      .sort((a, b) => a.order - b.order)
      .map(
        category => `<h2>${category.label}</h2>
        <ul>
          ${Object.keys(cards)
            .map(id => cards[id])
            .filter(card => card.categoryId === category.id)
            .map(card => `<li>${card.content}</li>`)
            .join('\n')}
        </ul>`
      )
      .join('\n')}
  </body>
  </html>`;

  return { filename: `retro-${board.id}.html`, content: s, contentType: 'text/html' };
};
