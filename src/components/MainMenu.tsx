import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { loadMyBoards, State, Boards, BoardData } from '../redux';
import List, { ListItem, ListSubheader, ListItemText } from 'material-ui/List';

export interface Props {
  boards: Boards;
  dispatch: Dispatch<{}>;
}

class MainMenu extends React.Component<Props, {}> {
  render() {
    const { boards } = this.props;
    const myBoards = Object.keys(boards.mine)
      .map(id => boards.items[id])
      .filter(board => board.state === 'present')
      .map(board => board as BoardData);

    return (
      <List component="nav">
        <ListSubheader>My Retrospectives</ListSubheader>
        {myBoards.map(board => (
          <ListItem key={board.id} button component={props => <NavLink to={`/boards/${board.id}`} {...props} />}>
            <ListItemText primary={board.label || board.id} />
          </ListItem>
        ))}
      </List>
    );
  }

  componentWillMount() {
    this.props.dispatch(loadMyBoards());
  }
}

export default connect((state: State) => ({ boards: state.boards }))(MainMenu);
