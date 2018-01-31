import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';

import { Category, Card } from '../redux';
import CardComp from './Card';

export interface Props {
  category: Category;
  cards: Card[];
  editCard(cardId: string): void;
  deleteCard(cardId: string): void;
  saveCard(cardId: string, content: string): void;
  abortCard(cardId: string): void;
}

export default (props: Props) => {
  const { category, cards } = props;

  return (
    <React.Fragment>
      <Header attached="top" inverted>
        {category.label}
      </Header>
      <Segment attached color={category.color}>
        {cards.map(card => (
          <CardComp
            key={card.id}
            card={card}
            color={category.color}
            edit={() => props.editCard(card.id)}
            delete={() => props.deleteCard(card.id)}
            save={content => props.saveCard(card.id, content)}
            cancel={() => props.abortCard(card.id)}
          />
        ))}
      </Segment>
    </React.Fragment>
  );
};
