import * as React from 'react';
import { Container, List, Message } from 'semantic-ui-react';

import { BoardData } from '../redux';

export interface Props {
  board: BoardData;
}

export default (props: Props) => {
  const url = location.href.replace(/\/participants$/, '');

  return (
    <Container>
      <Message info icon="share" header="Invite participants by sending them this link:" content={<a href={url}>{url}</a>} />

      <List relaxed>
        {Object.keys(props.board.participants)
          .map(id => ({ ...props.board.participants[id], id }))
          .sort((a, b) => (a.label || 'anonymous').localeCompare(b.label || 'anonymous'))
          .map(p => (
            <List.Item
              key={p.id}
              icon={p.role === 'owner' ? 'user' : 'user outline'}
              content={p.label ? `${p.label} (${p.role})` : <em>anonymous {p.role}</em>}
            />
          ))}
      </List>
    </Container>
  );
};
