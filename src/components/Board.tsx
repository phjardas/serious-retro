import * as React from 'react';

import { BoardData, BoardCards, Card } from '../redux';
import Category from './Category';

export interface Props {
  board: BoardData;
  cards: BoardCards;
}

export default (props: Props) => {
  const { board, cards } = props;

  const categoryCards: (categoryId: string) => Card[] = categoryId =>
    Object.keys(cards)
      .map(id => cards[id])
      .filter(card => card.categoryId === categoryId);

  return (
    <div>{board.categories.map(category => <Category key={category.id} category={category} cards={categoryCards(category.id)} />)}</div>
  );
};
