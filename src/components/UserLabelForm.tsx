import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

import { BoardData, setUserLabel } from '../redux';

export interface Props {
  board: BoardData;
  userId: string;
  dispatch: Dispatch<{}>;
}

interface State {
  label: string;
}

class UserLabelFrom extends React.Component<Props, State> {
  state = { label: this.props.board.participants[this.props.userId].label || '' };

  render() {
    const { label } = this.state;
    const submit = this.submit.bind(this);

    return (
      <Form onSubmit={submit}>
        <Form.Group inline>
          <Form.Input value={label} onChange={e => this.setState({ label: e.currentTarget.value })} />
          <Form.Button primary content="Update" />
        </Form.Group>
      </Form>
    );
  }

  submit() {
    this.props.dispatch(setUserLabel(this.props.board.id!, this.state.label));
  }
}

export default connect((state: any) => ({ userId: state.user.id }))(UserLabelFrom);
