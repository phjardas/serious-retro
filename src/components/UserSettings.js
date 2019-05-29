import React from 'react';
import { Button, Container, Form, Icon, Message } from 'semantic-ui-react';

import { BoardParticipant } from '../redux';

export interface Props {
  participant?: BoardParticipant;
  setUserLabel(label: string): void;
}

interface State {
  label: string;
}

export default class BoardSettings extends React.PureComponent<Props, State> {
  state = { label: this.props.participant && this.props.participant.explicitLabel ? this.props.participant.label : '' };

  render() {
    const { participant } = this.props;
    const { label } = this.state;
    const submit = this.submit.bind(this);

    return (
      <Container>
        <>
          {participant && !participant.explicitLabel && (
            <Message warning icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>
                  You are currently using the name <em>{participant.label}</em>
                </Message.Header>
                <p>Change your name now!</p>
              </Message.Content>
            </Message>
          )}

          <Form onSubmit={submit}>
            <Form.Input
              label="What should we call you?"
              value={label}
              onChange={e =>
                this.setState({
                  label: e.currentTarget.value,
                })
              }
            />
            <p style={{ color: participant && participant.color }}>
              <strong>TODO:</strong> edit user color
            </p>
            <Button primary content="Save" icon="save" />
          </Form>
        </>
      </Container>
    );
  }

  submit() {
    this.props.setUserLabel(this.state.label);
  }
}
