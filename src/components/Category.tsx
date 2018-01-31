import * as React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';

import { Category, Card } from '../redux';
import CardComp from './Card';

export interface Props {
  category: Category;
  cards: Card[];
  createCard(): void;
  editCard(cardId: string): void;
  deleteCard(cardId: string): void;
  saveCard(cardId: string, content: string): void;
  abortCard(cardId: string): void;
}

export default (props: Props) => {
  const { category, cards, createCard } = props;

  return (
    <React.Fragment>
      <Header attached="top" inverted>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {category.label}
          <Button icon="add" onClick={createCard} />
        </div>
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
        <Button content="Add new card" icon="add" color={category.color} onClick={createCard} />
      </Segment>
    </React.Fragment>
  );
};
