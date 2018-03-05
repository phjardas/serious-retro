import * as React from 'react';
import { Button } from 'semantic-ui-react';

export interface Props {
  pending: boolean;
  createBoard(): void;
}

export default function CreateBoard(props: Props) {
  const { createBoard, pending } = props;

  return <Button onClick={createBoard} size="large" primary icon="add" content="Create new retrospective" loading={pending} />;
}
