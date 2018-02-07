import * as React from 'react';
import { Container, Loader, Message } from 'semantic-ui-react';

import { Board, BoardCards } from '../redux';
import BoardComp, { Actions } from './Board';

const PendingBoard = () => <Loader active content="Loading retrospective…" />;

const DeletedBoard = () => (
  <Container style={{ marginTop: 60 }}>
    <Message negative size="large" icon="warning sign" header="Retrospective not found" content="Maybe it was deleted?" />
  </Container>
);

export interface Props extends Actions {
  board: Board;
  cards: BoardCards;
}

export default (props: Props) => {
  const { board } = props;
  switch (board.state) {
    case 'pending':
      return <PendingBoard />;
    case 'present':
      return <BoardComp {...props} board={board} />;
    case 'deleted':
      return <DeletedBoard />;
    default:
      return <p>ooops</p>;
  }
};
