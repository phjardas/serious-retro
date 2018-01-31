import * as React from 'react';

import { Category, Card } from '../redux';
import CardComp from './Card';

export interface Props {
  category: Category;
  cards: Card[];
}

export default (props: Props) => {
  const { category, cards } = props;

  return (
    <div>
      <h3>{category.label}</h3>
      <ul>{cards.map(card => <CardComp key={card.id} card={card} />)}</ul>
    </div>
  );
};
