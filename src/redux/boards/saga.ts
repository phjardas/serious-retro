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
  EXPORT_BOARD,
} from './types';
import { createBoardSuccess, createBoardError, BoardSettings } from './actions';
import {
  connectFirestoreDoc,
  connectFirestoreCollection,
  CollectionDocumentAdded,
  CollectionDocumentUpdated,
  CollectionDocumentDeleted,
} from '../common/saga';
import { synchronizeCards, BoardCards } from '../cards';
import { exportBoard as createBoardExport } from './export';

const firestore = firebase.firestore();
const boardsColl = firestore.collection('boards');

function* createBoard(action: any) {
  try {
    const userId: string = yield select((state: any) => state.user && state.user.id);
    const history: History = action.payload.history;

    const boardData: BoardData = {
      createdAt: new Date(),
      categories: [
        { id: 'good', label: 'What went well?', order: 0, color: 'green' },
        { id: 'bad', label: 'What went not so well?', order: 1, color: 'red' },
        { id: 'learned', label: 'What have I learned?', order: 2, color: 'brown' },
        { id: 'puzzle', label: 'What still puzzles me?', order: 3, color: 'orange' },
        { id: 'actions', label: 'Action items', order: 4, color: 'blue' },
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
      return { type: BOARD_PENDING, payload: { id } };
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

function* exportBoard(action: any) {
  const { id, exporter } = action.payload;
  const board: BoardData = yield select((state: any) => state.boards.items[id]);
  const cards: BoardCards = yield select((state: any) => state.cards[id]);
  const ex = yield call(createBoardExport, exporter, board, cards);
  yield call(downloadFile, ex);
}

function downloadFile(file: { filename: string; contentType: string; content: any }) {
  const blob = new Blob([file.content], { type: file.contentType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', file.filename);

  if (typeof link.download === 'undefined') {
    link.setAttribute('target', '_blank');
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function* saga() {
  yield takeEvery(CREATE_BOARD, createBoard);
  yield takeEvery(CONNECT_BOARD, connectBoard);
  yield takeEvery(DISCONNECT_BOARD, disconnectBoard);
  yield takeEvery(VISIT_BOARD, visitBoard);
  yield takeEvery(LOAD_MY_BOARDS, loadMyBoards);
  yield takeEvery(UPDATE_BOARD_SETTINGS, updateSettings);
  yield takeEvery(EXPORT_BOARD, exportBoard);
}
