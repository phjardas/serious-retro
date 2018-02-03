import * as React from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

import { BoardData, Category } from '../redux';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

export interface Props {
  board: BoardData;
  save(settings: { label: string }): void;
  cancel(): void;
}

interface State {
  label: string;
  categories: Category[];
}

export default class BoardSettings extends React.Component<Props, State> {
  state = {
    label: this.props.board.label || '',
    categories: Object.keys(this.props.board.categories)
      .map(id => this.props.board.categories[id])
      .sort((a, b) => a.order - b.order),
  };

  render() {
    const { label, categories } = this.state;
    const submit = this.submit.bind(this);

    return (
      <Form onSubmit={submit}>
        <Form.Input label="Retrospective name" value={label} onChange={e => this.setState({ label: e.currentTarget.value })} />

        <Header>Categories</Header>
        {categories.map(cat => (
          <Form.Group key={cat.id}>
            <Form.Input label="Label" value={cat.label} />
            <Form.Select label="Color" options={colors.map(c => ({ value: c, text: c }))} value={cat.color} />
          </Form.Group>
        ))}

        <Button primary content="Save" icon="save" />
        <Button content="Cancel" onClick={this.props.cancel} />
      </Form>
    );
  }

  submit() {
    this.props.save({ label: this.state.label });
  }
}
