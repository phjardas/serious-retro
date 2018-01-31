import * as React from 'react';
import { Card, Button, Dimmer, SemanticCOLORS } from 'semantic-ui-react';

import { Card as CardData } from '../redux';
import CardForm from './CardForm';

export interface Props {
  card: CardData;
  color: SemanticCOLORS;
  edit(): void;
  delete(): void;
  save(content: string): void;
  cancel(): void;
}

function createContent(props: Props) {
  const { card, edit, save, cancel } = props;

  if (card.editing) {
    return <CardForm content={card.content} save={save} cancel={cancel} />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div style={{ whiteSpace: 'pre-line', alignSelf: 'flex-start' }}>{card.content}</div>
      {card.mine && (
        <Button.Group>
          <Button icon="pencil" onClick={edit} />
          <Button icon="trash" onClick={props.delete} />
        </Button.Group>
      )}
    </div>
  );
}

export default (props: Props) => {
  const { card, color } = props;
  const edited = !!card.editedBy && !card.editing;

  return (
    <Dimmer.Dimmable as={Card} color={color} blurring dimmed={edited} fluid>
      <Dimmer active={edited} content="edited by someone else" />
      <Card.Content>{createContent(props)}</Card.Content>
    </Dimmer.Dimmable>
  );
};
