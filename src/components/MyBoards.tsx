import * as React from 'react';
import { Link } from 'react-router-dom';
import { Header, List } from 'semantic-ui-react';

import { Board } from '../redux';

interface Props {
  boards: Board[];
}

export default (props: Props) => {
  const { boards } = props;
  if (!boards.length) {
    return null;
  }

  return (
    <div style={{ marginTop: 40 }}>
      <Header as="h3">Recent retrospectives</Header>
      <List divided selection>
        {boards.map(board => (
          <List.Item key={board.id} as={Link} to={`/boards/${board.id}`}>
            <List.Content>
              {board.state === 'present' ? (
                <React.Fragment>
                  <List.Header>{board.label || board.id}</List.Header>
                  <List.Description>
                    {board.role === 'owner'
                      ? `You created this retrospective on ${board.createdAt.toLocaleDateString()}`
                      : 'You participated'}
                  </List.Description>
                </React.Fragment>
              ) : (
                <List.Description>loading&hellip;</List.Description>
              )}
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};
