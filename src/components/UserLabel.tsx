import * as React from 'react';
import { Label, LabelProps } from 'semantic-ui-react';
import { BoardParticipants } from '../redux';

export interface Props extends LabelProps {
  participants: BoardParticipants;
  userId: string;
}

export default function UserLabel(props: Props) {
  const { participants, userId } = props;
  const participant = participants[userId];

  const styles: React.CSSProperties = {};
  if (participant.color) {
    styles.backgroundColor = participant.color;
  }

  return (
    <Label {...props} style={styles}>
      {participant.label || userId}
    </Label>
  );
}
