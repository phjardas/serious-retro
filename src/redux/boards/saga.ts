import * as firebase from 'firebase';
import { call, fork, select, takeEvery, put } from 'redux-saga/effects';
import { History } from 'history';

import { BoardData } from './state';
import {
  CREATE_BOARD,
  CONNECT_BOARD,
  DISCONNECT_BOARD,
  BOARD_PENDING,
  BOARD_UPDATED,
  BOARD_DELETED,
  LOAD_MY_BOARDS,
  MY_BOARD_UPDATE,
  MY_BOARD_DELETE,
  VISIT_BOARD,
  UPDATE_BOARD_SETTINGS,
  UPDATE_BOARD_SETTINGS_SUCCESS,
  UPDATE_BOARD_SETTINGS_ERROR,
} from './types';
import { createBoardSuccess, createBoardError } from './actions';
import {
  connectFirestoreDoc,
  connectFirestoreCollection,
  CollectionDocumentAdded,
  CollectionDocumentUpdated,
  CollectionDocumentDeleted,
} from '../common/saga';
import { synchronizeCards } from '../cards/actions';
import { BoardSettings } from 'home/phjardas/workspace/serious-retro/src/redux';

const firestore = firebase.firestore();
const boardsColl = firestore.collection('boards');

function* createBoard(action: any) {
  try {
    const userId: string = yield select((state: any) => state.user && state.user.id);
    const history: History = action.payload.history;

    const boardData: BoardData = {
      createdAt: new Date(),
      categories: [
        { id: 'good', label: 'What went good', order: 0, color: 'green' },
        { id: 'bad', label: 'What went bad', order: 1, color: 'red' },
        { id: 'actions', label: 'Action items', order: 2, color: 'blue' },
      ].reduce((a, b) => ({ ...a, [b.id]: b }), {}),
      participants: { [userId]: 'owner' },
      role: 'owner',
    };

    const ref = yield call(boardsColl.add.bind(boardsColl), boardData);
    yield put(createBoardSuccess(ref.id));
    yield call(history.push.bind(history), `/boards/${ref.id}`);
  } catch (error) {
    yield put(createBoardError(error));
  }
}

function* visitBoard(action: any) {
  const { id } = action.payload;
  const userId: string = yield select((state: any) => state.user && state.user.id);
  const doc = boardsColl.doc(id);

  firestore.runTransaction(async tx => {
    const d = await tx.get(doc);
    if (d.exists) {
      const role = d.data().participants[userId] || 'participant';
      tx.update(doc, { [`participants.${userId}`]: role });
    }
  });
}

function* connectBoard(action: any) {
  const { id } = action.payload;
  const userId: string = yield select((state: any) => state.user && state.user.id);
  const doc = boardsColl.doc(id);

  yield fork(connectFirestoreDoc, doc, {
    pending() {
      return { type: BOARD_PENDING };
    },
    updated(payload: CollectionDocumentUpdated) {
      return {
        type: BOARD_UPDATED,
        payload: {
          ...payload,
          data: {
            ...payload.data,
            role: payload.data.participants[userId],
          },
        },
      };
    },
    deleted(payload: CollectionDocumentDeleted) {
      return { type: BOARD_DELETED, payload };
    },
  });

  yield put(synchronizeCards({ boardId: id }));
}

function* disconnectBoard(action: any) {
  const { id } = action.payload;
  // FIXME disconnectBoard: implement
  yield call(console.log.bind(console), 'disconnecting board %s', id);
}

function* loadMyBoards() {
  const userId: string = yield select((state: any) => state.user && state.user.id);
  const query = boardsColl.where(`participants.${userId}`, '>', '');
  const modified = (payload: CollectionDocumentAdded | CollectionDocumentUpdated) => ({
    type: MY_BOARD_UPDATE,
    payload: {
      ...payload,
      data: {
        ...payload.data,
        role: payload.data.participants[userId],
      },
    },
  });

  yield connectFirestoreCollection(query, {
    added: modified,
    updated: modified,
    deleted: (payload: CollectionDocumentDeleted) => ({ type: MY_BOARD_DELETE, payload }),
  });
}

function* updateSettings(action: any) {
  const { boardId, settings }: { boardId: string; settings: BoardSettings } = action.payload;

  try {
    const doc = boardsColl.doc(boardId);
    yield call(doc.update.bind(doc), settings);
    yield put({ type: UPDATE_BOARD_SETTINGS_SUCCESS, payload: { boardId } });
  } catch (error) {
    yield put({ type: UPDATE_BOARD_SETTINGS_ERROR, payload: { boardId }, error });
  }
}

export function* saga() {
  yield takeEvery(CREATE_BOARD, createBoard);
  yield takeEvery(CONNECT_BOARD, connectBoard);
  yield takeEvery(DISCONNECT_BOARD, disconnectBoard);
  yield takeEvery(VISIT_BOARD, visitBoard);
  yield takeEvery(LOAD_MY_BOARDS, loadMyBoards);
  yield takeEvery(UPDATE_BOARD_SETTINGS, updateSettings);
}
