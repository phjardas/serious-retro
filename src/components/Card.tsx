import * as React from 'react';
import { Card, Button, Dimmer, SemanticCOLORS } from 'semantic-ui-react';

import { Card as CardData, BoardParticipants } from '../redux';
import CardForm from './CardForm';
import UserLabel from './UserLabel';

export interface Props {
  card: CardData;
  participants: BoardParticipants;
  color: SemanticCOLORS;
  edit(): void;
  delete(): void;
  save(content: string): void;
  cancel(): void;
}

export default function CardComp(props: Props) {
  const { card, color, participants, edit, save, cancel } = props;
  const edited = !!card.editedBy && !card.editing;
  const owner = { ...participants[card.owner], id: card.owner };

  return (
    <Dimmer.Dimmable as={Card} color={color} blurring dimmed={edited} fluid>
      <Dimmer active={edited}>
        edited by <UserLabel userId={card.editedBy} participants={participants} />
      </Dimmer>
      {card.editing ? (
        <Card.Content>
          <CardForm content={card.content} save={save} cancel={cancel} />
        </Card.Content>
      ) : (
        <React.Fragment>
          <Card.Content>
            <Card.Description>
              <p>{card.content}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <UserLabel userId={owner.id} participants={participants} />
                {card.mine && (
                  <Button.Group>
                    <Button icon="pencil" onClick={edit} />
                    <Button icon="trash" onClick={props.delete} />
                  </Button.Group>
                )}
              </div>
            </Card.Description>
          </Card.Content>
        </React.Fragment>
      )}
    </Dimmer.Dimmable>
  );
}
