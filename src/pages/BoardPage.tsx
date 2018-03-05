import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { match as Match } from 'react-router';
import { Location } from 'history';

import { visitBoard, connectBoard, disconnectBoard } from '../redux';
import BoardWrapper from '../components/BoardWrapper';
import Layout from '../components/Layout';

interface Params {
  id: string;
}

interface Props {
  dispatch: Dispatch<{}>;
  location: Location;
  match: Match<Params>;
}

class BoardPage extends React.Component<Props> {
  render() {
    return (
      <Layout>
        <BoardWrapper boardId={this.getBoardId()} location={this.props.location} />
      </Layout>
    );
  }

  componentDidMount() {
    this.props.dispatch(visitBoard(this.getBoardId()));
    this.props.dispatch(connectBoard(this.getBoardId()));
  }

  componentWillUnmount() {
    this.props.dispatch(disconnectBoard(this.getBoardId()));
  }

  private getBoardId(): string {
    return this.props.match.params.id;
  }
}

export default connect()(BoardPage);
