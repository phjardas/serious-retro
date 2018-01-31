import * as React from 'react';
import { Container, Grid, SemanticWIDTHSNUMBER } from 'semantic-ui-react';

import { BoardData, BoardCards, Card } from '../redux';
import Category from './Category';

export interface Props {
  board: BoardData;
  cards: BoardCards;
  editCard(cardId: string): void;
  deleteCard(cardId: string): void;
  saveCard(cardId: string, content: string): void;
  abortCard(cardId: string): void;
}

export default (props: Props) => {
  const { board, cards, editCard, deleteCard, saveCard, abortCard } = props;

  const categoryCards: (categoryId: string) => Card[] = categoryId =>
    Object.keys(cards)
      .map(id => cards[id])
      .filter(card => card.categoryId === categoryId);

  const columns = Math.min(board.categories.length, 16) as SemanticWIDTHSNUMBER;

  return (
    <Container fluid>
      <Grid columns={columns} padded>
        {board.categories.map(category => (
          <Grid.Column key={category.id}>
            <Category
              category={category}
              cards={categoryCards(category.id)}
              editCard={editCard}
              deleteCard={deleteCard}
              saveCard={saveCard}
              abortCard={abortCard}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};
