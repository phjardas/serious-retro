import * as React from 'react';

import { Card } from '../redux';

export interface Props {
  card: Card;
}

export default (props: Props) => {
  const { card } = props;

  return <div>{card.content}</div>;
};
