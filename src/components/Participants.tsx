import * as React from 'react';
import { Container, List, Message } from 'semantic-ui-react';

import { BoardData, User } from '../redux';

export interface Props {
  board: BoardData;
  user: User;
}

export default function Participants(props: Props) {
  const { board, user } = props;
  const url = location.href.replace(/\/participants$/, '');

  return (
    <Container>
      <Message info icon="share" header="Invite participants by sending them this link:" content={<a href={url}>{url}</a>} />

      <List relaxed>
        {Object.keys(board.participants)
          .map(id => ({ ...board.participants[id], id }))
          .sort((a, b) => (a.label || 'anonymous').localeCompare(b.label || 'anonymous'))
          .map(p => {
            const styles: React.CSSProperties = {};
            if (p.color) {
              styles.color = p.color;
            }

            return (
              <List.Item key={p.id}>
                <List.Icon name={p.role === 'owner' ? 'user' : 'user outline'} style={styles} />
                <List.Content>
                  <List.Header style={styles}>{p.label ? `${p.label} (${p.role})` : <em>an anonymous {p.role}</em>}</List.Header>
                  {p.id === user.id && <List.Description>This is you!</List.Description>}
                </List.Content>
              </List.Item>
            );
          })}
      </List>
    </Container>
  );
}
