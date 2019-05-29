import { Reducer, combineReducers } from 'redux';

import { State } from './state';
import { reducer as boards } from './boards/reducer';
import { reducer as cards } from './cards/reducer';
import { reducer as user } from './user/reducer';

export const reducer: Reducer<State> = combineReducers({ boards, cards, user });
