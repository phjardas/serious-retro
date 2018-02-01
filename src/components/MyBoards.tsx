import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import { loadMyBoards, State, Boards } from '../redux';

interface Props {
  boards: Boards;
  dispatch: Dispatch<{}>;
}

class MyBoards extends React.Component<Props, {}> {
  render() {
    const { boards } = this.props;
    const myBoards = Object.keys(boards.owned).map(id => boards.items[id]);
    if (!myBoards.length) {
      return null;
    }

    return (
      <div>
        <Header as="h3">My retrospectives</Header>
        <ul>
          {myBoards.map(board => (
            <li key={board.id}>
              <Link to={`/boards/${board.id}`}>{board.id}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  componentWillMount() {
    this.props.dispatch(loadMyBoards());
  }
}

export default connect((state: State) => ({ boards: state.boards }))(MyBoards);
