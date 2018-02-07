import * as React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography/Typography';

import { Board, BoardCards } from '../redux';
import BoardComp, { Actions } from './Board';

const PendingBoard = () => (
  <Typography variant="caption" align="center">
    <div>
      <CircularProgress />
    </div>
    Loading retrospective
  </Typography>
);

const DeletedBoard = () => <p>Retrospective not found. Maybe it was deleted?</p>;

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
