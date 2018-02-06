import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { match as Match } from 'react-router';

import {
  State,
  Boards,
  Cards,
  visitBoard,
  connectBoard,
  disconnectBoard,
  createCard,
  editCard,
  deleteCard,
  saveCard,
  abortCard,
  updateBoardSettings,
  exportBoard,
  BoardSettings,
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
    const { boards, cards, dispatch, match } = this.props;
    const { id } = match.params;
    const board = boards.items[id] || { state: 'pending' };
    const boardCards = cards[id] || {};

    return (
      <Layout>
        <BoardComp
          board={board}
          cards={boardCards}
          createCard={categoryId => dispatch(createCard({ boardId: board.id, categoryId }))}
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
          updateSettings={(settings: BoardSettings) => dispatch(updateBoardSettings(board.id, settings))}
          exportBoard={(exporter: string) => dispatch(exportBoard(board.id, exporter))}
        />
      </Layout>
    );
  }

  componentWillMount() {
    this.props.dispatch(visitBoard(this.props.match.params.id));
    this.props.dispatch(connectBoard(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(disconnectBoard(this.props.match.params.id));
  }
}

export default connect((state: State) => ({ boards: state.boards, cards: state.cards }))(BoardPage);
