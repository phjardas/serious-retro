import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { match as Match } from 'react-router';

import {
  State,
  Boards,
  Board,
  Cards,
  BoardCards,
  connectBoard,
  disconnectBoard,
  editCard,
  deleteCard,
  saveCard,
  abortCard,
} from '../redux';
import Layout from '../components/Layout';
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

    return <Layout title={match.params.id}>{this.renderBoard(board, boardCards)}</Layout>;
  }

  renderBoard(board: Board, cards: BoardCards) {
    const { dispatch } = this.props;

    switch (board.state) {
      case 'pending':
        return <p>loading&hellip;</p>;
      case 'present':
        return (
          <BoardComp
            board={board}
            cards={cards}
            editCard={cardId =>
              dispatch(
                editCard({
                  boardId: board.id,
                  cardId,
                })
              )
            }
            deleteCard={cardId =>
              dispatch(
                deleteCard({
                  boardId: board.id,
                  cardId,
                })
              )
            }
            saveCard={(cardId, content) => dispatch(saveCard({ boardId: board.id, cardId, content }))}
            abortCard={cardId => dispatch(abortCard({ boardId: board.id, cardId }))}
          />
        );
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
