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

const firestore = firebase.firestore();
const boardsColl = firestore.collection('boards');

function* createBoard(action: any) {
  try {
    const userId: string = yield select((state: any) => state.user && state.user.id);
    const history: History = action.payload.history;

    const boardData: BoardData = {
      createdAt: new Date(),
      owner: userId,
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

function* connectBoard(action: any) {
  const { id } = action.payload;
  const doc = boardsColl.doc(id);
  yield fork(connectFirestoreDoc, doc, { pending: BOARD_PENDING, updated: BOARD_UPDATED, deleted: BOARD_DELETED });
  yield put(synchronizeCards({ boardId: id }));
}

function* disconnectBoard(action: any) {
  const { id } = action.payload;
  // FIXME disconnectBoard: implement
  yield call(console.log.bind(console), 'disconnecting board %s', id);
}

function* loadMyBoards() {
  const userId: string = yield select((state: any) => state.user && state.user.id);
  const query = boardsColl.where('owner', '==', userId);
  yield connectFirestoreCollection(query, {
    added: (payload: CollectionDocumentAdded) => ({ type: MY_BOARD_UPDATE, payload }),
    updated: (payload: CollectionDocumentUpdated) => ({ type: MY_BOARD_UPDATE, payload }),
    deleted: (payload: CollectionDocumentDeleted) => ({ type: MY_BOARD_UPDATE, payload }),
  });
}

export function* saga() {
  yield takeEvery(CREATE_BOARD, createBoard);
  yield takeEvery(CONNECT_BOARD, connectBoard);
  yield takeEvery(DISCONNECT_BOARD, disconnectBoard);
  yield takeEvery(LOAD_MY_BOARDS, loadMyBoards);
}
