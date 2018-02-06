import * as React from 'react';
import { Button, Container, Form, Header, Message, SemanticCOLORS } from 'semantic-ui-react';

import { BoardData, Category } from '../redux';

const colors: SemanticCOLORS[] = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
];

export interface Props {
  board: BoardData;
  save(settings: { label: string; categories: { [id: string]: Category } }): void;
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
      <Container>
        <Form onSubmit={submit}>
          <Form.Input label="Retrospective name" value={label} onChange={e => this.setState({ label: e.currentTarget.value })} />

          <Header>Categories</Header>
          {categories.map(cat => (
            <Form.Group key={cat.id}>
              <Form.Input value={cat.label} onChange={e => this.setCategoryValue(cat.id, 'label', e.currentTarget.value)} />
              <Form.Select
                selection
                value={cat.color}
                text={cat.color}
                options={colors.map(c => ({
                  key: c,
                  value: c,
                  text: c,
                  label: { color: c, empty: true, circular: true },
                }))}
                onChange={e => this.setCategoryValue(cat.id, 'color', e.currentTarget.textContent)}
              />
            </Form.Group>
          ))}

          <Message
            info
            size="small"
            icon="info circle"
            header="Some features are still missing:"
            content={
              <ul>
                <li>Add category</li>
                <li>Remove category</li>
                <li>Reorder categories</li>
                <li>Allow editing for everyone</li>
              </ul>
            }
          />

          <Button primary content="Save" icon="save" />
        </Form>
      </Container>
    );
  }

  setCategoryValue(categoryId: string, field: string, value: any) {
    this.setState({
      categories: this.state.categories.map(cat => (cat.id === categoryId ? { ...cat, [field]: value } : cat)),
    });
  }

  submit() {
    this.props.save({
      label: this.state.label,
      categories: this.state.categories.reduce((a, b, i) => ({ ...a, [b.id]: { ...b, order: i } }), {}),
    });
  }
}
