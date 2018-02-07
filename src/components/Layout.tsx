import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Menu, Dropdown } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import { loadMyBoards, State, Boards } from '../redux';
import Footer from './Footer';

export interface Props {
  title?: string;
  boards: Boards;
  children: React.ReactNode;
  dispatch: Dispatch<{}>;
}

class Layout extends React.Component<Props, {}> {
  render() {
    const { title, boards, children } = this.props;
    const myBoards = Object.keys(boards.mine).map(id => boards.items[id]);

    return (
      <React.Fragment>
        <Helmet>
          <title>{title ? `${title} - ` : ''}Serious Retrospective</title>
        </Helmet>
        <Menu fixed="top" inverted>
          <Menu.Item as={Link} to="/">
            <Icon name="comments" />
            {title ? title : 'Serious Retrospective'}
          </Menu.Item>
          {myBoards.length > 0 && (
            <Dropdown item text="Retrospectives">
              <Dropdown.Menu>
                {myBoards.map(board => (
                  <Dropdown.Item key={board.id} as={Link} to={`/boards/${board.id}`}>
                    {board.state === 'present' ? board.label || board.id : 'loading&hellip;'}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu>

        <div style={{ marginTop: 40, flexGrow: 1 }}>{children}</div>

        <Footer />
      </React.Fragment>
    );
  }

  componentWillMount() {
    this.props.dispatch(loadMyBoards());
  }
}

export default connect((state: State) => ({ boards: state.boards }))(Layout);
