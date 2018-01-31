import * as firebase from 'firebase';
import { eventChannel } from 'redux-saga';
import { call, take, takeEvery, put } from 'redux-saga/effects';
import { History } from 'history';

import { CREATE_BOARD, CONNECT_BOARD, DISCONNECT_BOARD, BOARD_PENDING, BOARD_UPDATED, BOARD_DELETED } from './types';
import { createBoardSuccess, createBoardError } from './actions';

const firestore = firebase.firestore();
const boardsColl = firestore.collection('boards');

function* createBoard(action: any) {
  const history: History = action.payload.history;
  try {
    const ref = yield call(boardsColl.add.bind(boardsColl), { createdAt: new Date() });
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

function* connectBoard(action: any) {
  const { id } = action.payload;
  yield call(connectFirestoreDoc, boardsColl.doc(id), { pending: BOARD_PENDING, updated: BOARD_UPDATED, deleted: BOARD_DELETED });
}

function* disconnectBoard(action: any) {
  const { id } = action.payload;
  yield call(console.log.bind(console), 'disconnecting board %s', id);
}

export function* rootSaga() {
  yield takeEvery(CREATE_BOARD, createBoard);
  yield takeEvery(CONNECT_BOARD, connectBoard);
  yield takeEvery(DISCONNECT_BOARD, disconnectBoard);
}
