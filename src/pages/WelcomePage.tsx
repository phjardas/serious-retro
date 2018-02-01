import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import { State, createBoard } from '../redux';
import Layout from '../components/Layout';
import CreateBoard from '../components/CreateBoard';
import MyBoards from '../components/MyBoards';

const WelcomePage = (props: any) => {
  const { boards, dispatch, history } = props;
  const pending = boards.creation && boards.creation.pending;

  return (
    <Layout>
      <Container text style={{ marginTop: 60 }}>
        <Header as="h2">Welcome</Header>
        <CreateBoard pending={pending} createBoard={() => dispatch(createBoard(history))} />
        <MyBoards />
      </Container>
    </Layout>
  );
};

export default connect((state: State) => ({ boards: state.boards }))(WelcomePage);
