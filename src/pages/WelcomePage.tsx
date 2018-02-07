import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { History } from 'history';

import { State, Boards } from '../redux';
import Layout from '../components/Layout';

export interface Props {
  boards: Boards;
  history: History;
  dispatch: Dispatch<{}>;
}

class WelcomePage extends React.Component<Props, {}> {
  render() {
    return (
      <Layout>
        <div>
          <h2>Welcome</h2>
        </div>
      </Layout>
    );
  }
}

export default connect((state: State) => ({ boards: state.boards }))(WelcomePage);
