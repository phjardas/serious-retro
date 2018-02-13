import * as shortid from 'shortid';
import { call, put } from 'redux-saga/effects';
import * as animals from 'animals';
import * as randomcolor from 'randomcolor';

import { INIT_USER } from './types';

function* initialize() {
  let payload = yield call(localStorage.getItem.bind(localStorage), 'serious-retro.user');
  if (payload) {
    payload = JSON.parse(payload);
  }

  if (!payload) {
    let id = yield call(localStorage.getItem.bind(localStorage), 'serious-retro.userId');
    if (!id) {
      id = shortid.generate();
    }
    payload = { id };
  }

  payload.label = payload.label || `anonymous ${animals()}`;
  payload.color = payload.color || randomcolor();

  yield call(localStorage.setItem.bind(localStorage), 'serious-retro.user', JSON.stringify(payload));
  yield put({ type: INIT_USER, payload });
}

export function* saga() {
  yield initialize();
}
