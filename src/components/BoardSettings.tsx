import * as React from 'react';
import { Button, Form } from 'semantic-ui-react';

import { BoardData } from '../redux';

export interface Props {
  board: BoardData;
  save(settings: { label: string }): void;
  cancel(): void;
}

interface State {
  label: string;
}

export default class BoardSettings extends React.Component<Props, State> {
  state = {
    label: this.props.board.label || '',
  };

  render() {
    const { label } = this.state;
    const submit = this.submit.bind(this);

    return (
      <Form onSubmit={submit}>
        <Form.Input label="Retrospective name" value={label} onChange={e => this.setState({ label: e.currentTarget.value })} />
        <Button primary content="Save" icon="save" />
        <Button content="Cancel" onClick={this.props.cancel} />
      </Form>
    );
  }

  submit() {
    this.props.save({ label: this.state.label });
  }
}
