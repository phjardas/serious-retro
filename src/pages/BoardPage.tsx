import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { match as Match } from 'react-router';

import { State, Boards, Board, connectBoard, disconnectBoard } from '../redux';

interface Params {
  id: string;
}

interface Props {
  boards: Boards;
  dispatch: Dispatch<{}>;
  match: Match<Params>;
}

class BoardPage extends React.Component<Props, {}> {
  render() {
    const { boards, match } = this.props;
    const board = boards.items[match.params.id] || { state: 'pending' };

    return (
      <div>
        <h2>Board {match.params.id}</h2>
        {this.renderBoard(board)}
      </div>
    );
  }

  renderBoard(board: Board) {
    switch (board.state) {
      case 'pending':
        return <p>loading&hellip;</p>;
      case 'present':
        return <pre>{JSON.stringify(board, null, 2)}</pre>;
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

export default connect((state: State) => ({ boards: state.boards }))(BoardPage);
