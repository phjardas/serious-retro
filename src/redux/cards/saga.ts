import * as firebase from 'firebase';
import { call, select, takeEvery } from 'redux-saga/effects';
import {
  SYNCHRONIZE_CARDS,
  CARD_ADDED,
  CARD_UPDATED,
  CARD_DELETED,
  EDIT_CARD,
  DELETE_CARD,
  SAVE_CARD,
  ABORT_CARD,
  CREATE_CARD,
} from './types';
import { connectFirestoreCollection, CollectionDocumentAdded, CollectionDocumentUpdated, CollectionDocumentDeleted } from '../common/saga';

const firestore = firebase.firestore();
const boardsColl = firestore.collection('boards');

function* synchronizeCards(action: any) {
  const { boardId } = action.payload;
  const userId: string = yield select((state: any) => state.user && state.user.id);
  const coll = boardsColl.doc(boardId).collection('cards');
  const addedOrModified = (type: string) => (payload: CollectionDocumentAdded | CollectionDocumentUpdated) => {
    const owner = payload.data.owner === userId;
    return {
      type,
      payload: {
        boardId,
        ...payload,
        data: {
          ...payload.data,
          mine: owner,
          editing: payload.data.editedBy && owner,
        },
      },
    };
  };

  yield call(connectFirestoreCollection, coll, {
    added: addedOrModified(CARD_ADDED),
    updated: addedOrModified(CARD_UPDATED),
    deleted: (payload: CollectionDocumentDeleted) => ({
      type: CARD_DELETED,
      payload: { boardId, ...payload },
    }),
  });
}

function* updateCard(boardId: string, cardId: string, values: any) {
  const doc = boardsColl
    .doc(boardId)
    .collection('cards')
    .doc(cardId);
  yield call(doc.update.bind(doc), values);
}

function* createCard(action: any) {
  const { boardId, categoryId } = action.payload;
  const userId: string = yield select((state: any) => state.user && state.user.id);
  const coll = boardsColl.doc(boardId).collection('cards');
  yield call(coll.add.bind(coll), {
    categoryId,
    owner: userId,
    editedBy: userId,
    createdAt: new Date(),
  });
}

function* editCard(action: any) {
  const { boardId, cardId } = action.payload;
  const userId: string = yield select((state: any) => state.user && state.user.id);
  yield call(updateCard, boardId, cardId, { editedBy: userId });
}

function* saveCard(action: any) {
  const { boardId, cardId, content } = action.payload;
  yield call(updateCard, boardId, cardId, { content, editedBy: null });
}

function* abortCard(action: any) {
  const { boardId, cardId } = action.payload;
  yield call(updateCard, boardId, cardId, { editedBy: null });
}

function* deleteCard(action: any) {
  const { boardId, cardId } = action.payload;
  const doc = boardsColl
    .doc(boardId)
    .collection('cards')
    .doc(cardId);
  yield call(doc.delete.bind(doc));
}

export function* saga() {
  yield takeEvery(SYNCHRONIZE_CARDS, synchronizeCards);
  yield takeEvery(CREATE_CARD, createCard);
  yield takeEvery(EDIT_CARD, editCard);
  yield takeEvery(SAVE_CARD, saveCard);
  yield takeEvery(ABORT_CARD, abortCard);
  yield takeEvery(DELETE_CARD, deleteCard);
}
