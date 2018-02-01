import { all, call } from 'redux-saga/effects';

import { saga as boards } from './boards/saga';
import { saga as cards } from './cards/saga';
import { saga as user } from './user/saga';

export function* rootSaga() {
  yield all([boards, cards, user].map(call));
}
