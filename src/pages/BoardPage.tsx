import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { match as Match } from 'react-router';

import { State, Boards, Board, Cards, BoardCards, connectBoard, disconnectBoard } from '../redux';
import BoardComp from '../components/Board';

interface Params {
  id: string;
}

interface Props {
  boards: Boards;
  cards: Cards;
  dispatch: Dispatch<{}>;
  match: Match<Params>;
}

class BoardPage extends React.Component<Props, {}> {
  render() {
    const { boards, cards, match } = this.props;
    const { id } = match.params;
    const board = boards.items[id] || { state: 'pending' };
    const boardCards = cards[id] || {};

    return (
      <div>
        <h2>Board {match.params.id}</h2>
        {this.renderBoard(board, boardCards)}
      </div>
    );
  }

  renderBoard(board: Board, cards: BoardCards) {
    switch (board.state) {
      case 'pending':
        return <p>loading&hellip;</p>;
      case 'present':
        return <BoardComp board={board} cards={cards} />;
      case 'deleted':
        return <p>Not found!</p>;
      default:
        return <p>ooops</p>;
    }
  }

  componentWillMount() {
    this.props.dispatch(connectBoard(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(disconnectBoard(this.props.match.params.id));
  }
}

export default connect((state: State) => ({ boards: state.boards, cards: state.cards }))(BoardPage);
