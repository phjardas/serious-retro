import * as React from 'react';
import { Container, List, Message } from 'semantic-ui-react';

import { BoardData, User } from '../redux';

export interface Props {
  board: BoardData;
  user: User;
}

export default (props: Props) => {
  const { board, user } = props;
  const url = location.href.replace(/\/participants$/, '');

  return (
    <Container>
      <Message info icon="share" header="Invite participants by sending them this link:" content={<a href={url}>{url}</a>} />

      <List relaxed>
        {Object.keys(board.participants)
          .map(id => ({ ...board.participants[id], id }))
          .sort((a, b) => (a.label || 'anonymous').localeCompare(b.label || 'anonymous'))
          .map(p => (
            <List.Item
              key={p.id}
              icon={p.role === 'owner' ? 'user' : 'user outline'}
              header={p.label ? `${p.label} (${p.role})` : <em>an anonymous {p.role}</em>}
              description={p.id === user.id && 'This is you!'}
            />
          ))}
      </List>
    </Container>
  );
};
