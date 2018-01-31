import * as React from 'react';
import { Button, Form } from 'semantic-ui-react';

export interface Props {
  content: string;
  save(content: string): void;
  cancel(): void;
}

export interface State {
  content: string;
}

export default class CardForm extends React.Component<Props, State> {
  state: State = {
    content: this.props.content,
  };

  render() {
    const { content } = this.state;
    const { save, cancel } = this.props;

    return (
      <Form>
        <Form.TextArea value={content} onChange={e => this.setState({ content: e.currentTarget.value })} />
        <Button.Group floated="right">
          <Button icon="check" onClick={() => save(content)} />
          <Button icon="cancel" onClick={cancel} />
        </Button.Group>
      </Form>
    );
  }
}
