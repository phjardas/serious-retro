import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Grid, Message, Icon } from 'semantic-ui-react';

import { BoardData, BoardCards, BoardParticipant, Card, State } from '../redux';
import Category from './Category';

interface OwnProps {
  board: BoardData;
  participant?: BoardParticipant;
  createCard(categoryId: string): void;
  editCard(cardId: string): void;
  deleteCard(cardId: string): void;
  saveCard(cardId: string, content: string): void;
  abortCard(cardId: string): void;
}

interface Props extends OwnProps {
  cards: BoardCards;
}

function BoardCardsComp(props: Props) {
  const { board, cards, participant, createCard, editCard, deleteCard, saveCard, abortCard } = props;

  const categoryCards: (categoryId: string) => Card[] = categoryId =>
    Object.keys(cards)
      .map(id => cards[id])
      .filter(card => card.categoryId === categoryId);

  const categories = Object.keys(board.categories)
    .map(id => board.categories[id])
    .sort((a, b) => a.order - b.order);

  return (
    <Grid padded>
      <>
        {!board.label && participant && participant.role === 'owner' && (
          <Grid.Column mobile={16}>
            <Message warning icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>Your retrospective has no name yet.</Message.Header>
                <Button
                  as={Link}
                  to={`/boards/${board.id}/settings`}
                  primary
                  content="Set a retrospective name now!"
                  style={{ marginTop: '1rem' }}
                />
              </Message.Content>
            </Message>
          </Grid.Column>
        )}

        {participant && !participant.explicitLabel && (
          <Grid.Column mobile={16}>
            <Message warning icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>
                  You are currently using the name <em>{participant.label}</em>
                </Message.Header>
                <Button as={Link} to={`/boards/${board.id}/user`} primary content="Change your name now!" style={{ marginTop: '1rem' }} />
              </Message.Content>
            </Message>
          </Grid.Column>
        )}

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
      </>
    </Grid>
  );
}

export default connect(
  (state: State) => ({ cards: state.cards }),
  dispatch => ({ dispatch }),
  (stateProps, dispatchProps, ownProps: OwnProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    cards: stateProps.cards[ownProps.board.id] || {},
  })
)(BoardCardsComp);
