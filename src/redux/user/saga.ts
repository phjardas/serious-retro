import * as shortid from 'shortid';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as animals from 'animals';
import * as randomcolor from 'randomcolor';

import { INIT_USER } from './types';
import { User } from './state';
import { SET_USER_LABEL } from '../boards/types';

function* initialize() {
  let user: Partial<User>;

  const userData = yield call(localStorage.getItem.bind(localStorage), 'serious-retro.user');
  user = userData && JSON.parse(userData);

  if (!user) {
    let id = yield call(localStorage.getItem.bind(localStorage), 'serious-retro.userId');
    if (!id) {
      id = shortid.generate();
    }
    user = { id };
  }

  if (!user.label) {
    user.label = `anonymous ${animals()}`;
  }
  if (!user.explicitLabel) {
    user.explicitLabel = false;
  }

  if (!user.color) {
    user.color = randomcolor();
  }
  if (!user.explicitColor) {
    user.explicitColor = false;
  }

  yield call(localStorage.setItem.bind(localStorage), 'serious-retro.user', JSON.stringify(user));
  yield put({ type: INIT_USER, payload: user });
}

function* setUserLabel(action: any) {
  const { label } = action.payload;
  const user = JSON.parse(yield call(localStorage.getItem.bind(localStorage), 'serious-retro.user'));
  user.label = label;
  yield call(localStorage.setItem.bind(localStorage), 'serious-retro.user', JSON.stringify(user));
}

export function* saga() {
  yield initialize();
  yield takeEvery(SET_USER_LABEL, setUserLabel);
}
