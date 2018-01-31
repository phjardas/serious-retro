import * as React from 'react';
import { Container, Grid, Loader, SemanticWIDTHSNUMBER } from 'semantic-ui-react';

import { Board, BoardData, BoardCards, Card } from '../redux';
import Category from './Category';

export interface Props {
  board: Board;
  cards: BoardCards;
  createCard(categoryId: string): void;
  editCard(cardId: string): void;
  deleteCard(cardId: string): void;
  saveCard(cardId: string, content: string): void;
  abortCard(cardId: string): void;
}

function renderPending() {
  return <Loader active content="Loading retrospective…" />;
}

function renderPresent(board: BoardData, props: Props) {
  const { cards, createCard, editCard, deleteCard, saveCard, abortCard } = props;

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
              createCard={() => createCard(category.id)}
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
}

export default (props: Props) => {
  const { board } = props;
  switch (board.state) {
    case 'pending':
      return renderPending();
    case 'present':
      return renderPresent(board, props);
    case 'deleted':
      return <p>Not found!</p>;
    default:
      return <p>ooops</p>;
  }
};
