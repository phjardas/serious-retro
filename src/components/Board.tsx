import * as React from 'react';
import { Container, Grid, Loader, Message, SemanticWIDTHSNUMBER } from 'semantic-ui-react';

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

function renderNotFound() {
  return (
    <Container style={{ marginTop: 60 }}>
      <Message negative size="large" icon="warning sign" header="Retrospective not found" content="Maybe it was deleted?" />
    </Container>
  );
}

function renderPresent(board: BoardData, props: Props) {
  const { cards, createCard, editCard, deleteCard, saveCard, abortCard } = props;

  const categoryCards: (categoryId: string) => Card[] = categoryId =>
    Object.keys(cards)
      .map(id => cards[id])
      .filter(card => card.categoryId === categoryId);

  const categories = Object.keys(board.categories)
    .map(id => board.categories[id])
    .sort((a, b) => a.order - b.order);
  const columns = Math.min(categories.length, 16) as SemanticWIDTHSNUMBER;

  return (
    <Container fluid>
      <Grid columns={columns} padded>
        {categories.map(category => (
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
      return renderNotFound();
    default:
      return <p>ooops</p>;
  }
};
