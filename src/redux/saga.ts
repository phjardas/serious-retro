import * as firebase from 'firebase';
import * as shortid from 'shortid';
import { eventChannel } from 'redux-saga';
import { call, fork, select, take, takeEvery, put } from 'redux-saga/effects';
import { History } from 'history';

import { State, BoardData } from './state';
import {
  INIT_USER,
  CREATE_BOARD,
  CONNECT_BOARD,
  DISCONNECT_BOARD,
  BOARD_PENDING,
  BOARD_UPDATED,
  BOARD_DELETED,
  CARD_ADDED,
  CARD_UPDATED,
  CARD_DELETED,
  EDIT_CARD,
  DELETE_CARD,
  SAVE_CARD,
  ABORT_CARD,
} from './types';
import { createBoardSuccess, createBoardError } from './actions';

const firestore = firebase.firestore();
const boardsColl = firestore.collection('boards');

function* initialize() {
  const localStorageKey = 'serious-retro.userId';
  let userId = yield call(localStorage.getItem.bind(localStorage), localStorageKey);

  if (!userId) {
    userId = shortid.generate();
    yield call(localStorage.setItem.bind(localStorage), localStorageKey, userId);
  }

  yield put({ type: INIT_USER, payload: { id: userId } });
}

function* createBoard(action: any) {
  try {
    const history: History = action.payload.history;

    const boardData: BoardData = {
      createdAt: new Date(),
      categories: [
        { id: 'good', label: 'What went good', color: 'green' },
        { id: 'bad', label: 'What went bad', color: 'red' },
        { id: 'actions', label: 'Action items', color: 'blue' },
      ],
    };

    const ref = yield call(boardsColl.add.bind(boardsColl), boardData);
    yield put(createBoardSuccess(ref.id));
    yield call(history.push.bind(history), `/boards/${ref.id}`);
  } catch (error) {
    yield put(createBoardError(error));
  }
}

function* connectFirestoreDoc(ref: firebase.firestore.DocumentReference, actions: { pending: string; updated: string; deleted: string }) {
  yield put({ type: actions.pending, payload: { id: ref.id } });

  const channel = yield eventChannel(emit => {
    return ref.onSnapshot(snapshot => {
      if (snapshot.exists) {
        emit({ type: actions.updated, payload: { id: snapshot.id, data: snapshot.data() } });
      } else {
        emit({ type: actions.deleted, payload: { id: snapshot.id } });
      }
    });
  });

  try {
    while (true) {
      const event = yield take(channel);
      yield put(event);
    }
  } catch (err) {
    console.error('error:', err);
  } finally {
    console.log('done.');
  }
}

type CollectionDocumentAdded = { id: string; data: any };
type CollectionDocumentUpdated = { id: string; data: any };
type CollectionDocumentDeleted = { id: string };

function* connectFirestoreCollection(
  ref: firebase.firestore.CollectionReference,
  actions: {
    added(payload: CollectionDocumentAdded): any;
    updated(payload: CollectionDocumentUpdated): any;
    deleted(payload: CollectionDocumentDeleted): any;
  }
) {
  const channel = yield eventChannel(emit =>
    ref.onSnapshot(snapshot =>
      snapshot.docChanges.forEach(change => {
        switch (change.type) {
          case 'added':
            emit(actions.added({ id: change.doc.id, data: change.doc.data() }));
            break;

          case 'removed':
            emit(actions.deleted({ id: change.doc.id }));
            break;

          case 'modified':
            emit(actions.updated({ id: change.doc.id, data: change.doc.data() }));
            break;

          default:
            console.error('Unrecognized snapshot change type: %s', change.type);
        }
      })
    )
  );

  try {
    while (true) {
      const event = yield take(channel);
      yield put(event);
    }
  } catch (err) {
    console.error('error:', err);
  } finally {
    console.log('done.');
  }
}

function* connectBoard(action: any) {
  const { id } = action.payload;
  const doc = boardsColl.doc(id);
  yield fork(connectFirestoreDoc, doc, { pending: BOARD_PENDING, updated: BOARD_UPDATED, deleted: BOARD_DELETED });

  const userId = yield select<State>(state => state.user && state.user.id);
  yield fork(connectFirestoreCollection, doc.collection('cards'), {
    added: (payload: CollectionDocumentAdded) => ({
      type: CARD_ADDED,
      payload: { boardId: id, ...payload, data: { ...payload.data, editing: payload.data.editedBy === userId } },
    }),
    updated: (payload: CollectionDocumentUpdated) => ({
      type: CARD_UPDATED,
      payload: { boardId: id, ...payload, data: { ...payload.data, editing: payload.data.editedBy === userId } },
    }),
    deleted: (payload: CollectionDocumentDeleted) => ({ type: CARD_DELETED, payload: { boardId: id, ...payload } }),
  });
}

function* disconnectBoard(action: any) {
  const { id } = action.payload;
  yield call(console.log.bind(console), 'disconnecting board %s', id);
}

function* updateCard(boardId: string, cardId: string, values: any) {
  const doc = boardsColl
    .doc(boardId)
    .collection('cards')
    .doc(cardId);
  yield call(doc.update.bind(doc), values);
}

function* editCard(action: any) {
  const { boardId, cardId } = action.payload;
  const userId = yield select<State>(state => state.user && state.user.id);
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
  yield call(console.log.bind(console), { boardId, cardId });
}

export function* rootSaga() {
  yield initialize();
  yield takeEvery(CREATE_BOARD, createBoard);
  yield takeEvery(CONNECT_BOARD, connectBoard);
  yield takeEvery(DISCONNECT_BOARD, disconnectBoard);
  yield takeEvery(EDIT_CARD, editCard);
  yield takeEvery(SAVE_CARD, saveCard);
  yield takeEvery(ABORT_CARD, abortCard);
  yield takeEvery(DELETE_CARD, deleteCard);
}
