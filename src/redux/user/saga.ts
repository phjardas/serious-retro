import * as shortid from 'shortid';
import { call, put } from 'redux-saga/effects';

import { INIT_USER } from './types';

function* initialize() {
  const localStorageKey = 'serious-retro.userId';
  let userId = yield call(localStorage.getItem.bind(localStorage), localStorageKey);

  if (!userId) {
    userId = shortid.generate();
    yield call(localStorage.setItem.bind(localStorage), localStorageKey, userId);
  }

  yield put({ type: INIT_USER, payload: { id: userId } });
}

export function* saga() {
  yield initialize();
}
