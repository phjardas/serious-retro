import * as React from 'react';
import { Accordion, Form } from 'semantic-ui-react';

import { BoardData } from '../redux';

export interface Props {
  board: BoardData;
  save(settings: { label: string }): void;
}

interface State {
  expanded: boolean;
  label: string;
}

export default class BoardSettings extends React.Component<Props, State> {
  state = {
    expanded: false,
    label: this.props.board.label || '',
  };

  render() {
    const { expanded, label } = this.state;
    const submit = this.submit.bind(this);

    return (
      <Accordion styled fluid>
        <Accordion.Title content="Settings" active={expanded} index={0} onClick={() => this.setState({ expanded: !expanded })} />
        <Accordion.Content active={expanded}>
          <Form onSubmit={submit}>
            <Form.Input label="Retrospective name" value={label} onChange={e => this.setState({ label: e.currentTarget.value })} />
            <Form.Button primary content="Save" />
          </Form>
        </Accordion.Content>
      </Accordion>
    );
  }

  submit() {
    this.props.save({ label: this.state.label });
    this.setState({ expanded: false });
  }
}
