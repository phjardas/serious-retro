import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { History } from 'history';
import { Container, Header } from 'semantic-ui-react';

import { State, createBoard, Boards } from '../redux';
import Layout from '../components/Layout';
import CreateBoard from '../components/CreateBoard';
import MyBoards from '../components/MyBoards';

export interface Props {
  boards: Boards;
  history: History;
  dispatch: Dispatch<{}>;
}

class WelcomePage extends React.Component<Props, {}> {
  render() {
    const { boards, dispatch, history } = this.props;
    const pending = !!boards.creation && boards.creation.pending;
    const myBoards = Object.keys(boards.mine).map(id => boards.items[id]);

    return (
      <Layout>
        <Container text style={{ marginTop: 60 }}>
          <Header as="h2">Welcome</Header>
          <CreateBoard pending={pending} createBoard={() => dispatch(createBoard(history))} />
          <MyBoards boards={myBoards} />
        </Container>
      </Layout>
    );
  }
}

export default connect((state: State) => ({ boards: state.boards }))(WelcomePage);
