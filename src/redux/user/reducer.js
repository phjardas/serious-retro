import { Reducer } from 'redux';

import { User } from './state';
import { INIT_USER } from './types';

export const reducer: Reducer<User | null> = (state = null, action) => {
  switch (action.type) {
    case INIT_USER:
      return action.payload;
    default:
      return state;
  }
};
