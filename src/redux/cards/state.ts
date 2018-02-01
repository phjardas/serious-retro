export interface Card {
  id: string;
  categoryId: string;
  content: string;
  createdAt: Date;
  owner: string;
  editedBy?: string;
  editing?: boolean;
  mine?: boolean;
}

export interface BoardCards {
  [cardId: string]: Card;
}

export interface Cards {
  [boardId: string]: BoardCards;
}
