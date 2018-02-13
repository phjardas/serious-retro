import * as React from 'react';
import { Grid } from 'semantic-ui-react';

import { BoardData, BoardCards, Card } from '../redux';
import Category from './Category';

export interface Props {
  board: BoardData;
  cards: BoardCards;
  createCard(categoryId: string): void;
  editCard(cardId: string): void;
  deleteCard(cardId: string): void;
  saveCard(cardId: string, content: string): void;
  abortCard(cardId: string): void;
}

export default (props: Props) => {
  const { board, cards, createCard, editCard, deleteCard, saveCard, abortCard } = props;

  const categoryCards: (categoryId: string) => Card[] = categoryId =>
    Object.keys(cards)
      .map(id => cards[id])
      .filter(card => card.categoryId === categoryId);

  const categories = Object.keys(board.categories)
    .map(id => board.categories[id])
    .sort((a, b) => a.order - b.order);

  return (
    <Grid padded>
      {categories.map(category => (
        <Grid.Column key={category.id} mobile={16} tablet={8} computer={4}>
          <Category
            category={category}
            cards={categoryCards(category.id)}
            participants={board.participants}
            createCard={() => createCard(category.id)}
            editCard={editCard}
            deleteCard={deleteCard}
            saveCard={saveCard}
            abortCard={abortCard}
          />
        </Grid.Column>
      ))}
    </Grid>
  );
};
