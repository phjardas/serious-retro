import React, { createContext, useContext, useState } from 'react';
import { firestore } from './firebase';
import { useUser } from './user';

const BoardsContext = createContext();
const boardsColl = firestore.collection('boards');

export function BoardsProvider({ children }) {
  const [context, setContext] = useState({ loading: true });
  const user = useUser();
  const query = boardsColl.where(`participants.${user.id}.role`, '>', '');
  query.onSnapshot(snapshot => setContext({ loading: false, boards: snapshot.docs }));

  return <BoardsContext.Provider value={context}>{children}</BoardsContext.Provider>;
}

export function useBoards() {
  const context = useContext(BoardsContext);
  if (!context) throw new Error('useBoards() must be wrapped with a <BoardsProvider />');
  return context;
}
