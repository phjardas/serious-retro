import { Reducer, combineReducers } from 'redux';

import { State, Boards, ErrorInfo } from './state';
import { CREATE_BOARD, CREATE_BOARD_SUCCESS, CREATE_BOARD_ERROR, BOARD_PENDING, BOARD_UPDATED, BOARD_DELETED } from './types';

function renderError(error: Error): ErrorInfo {
  return { message: error.message };
}

const boards: Reducer<Boards> = (state = { items: {} }, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      return { ...state, creation: { pending: true } };

    case CREATE_BOARD_SUCCESS:
      return { ...state, creation: { pending: false, ...action.payload } };

    case CREATE_BOARD_ERROR:
      return { ...state, creation: { pending: false, error: renderError(action.payload) } };

    case BOARD_PENDING:
      return { ...state, items: { ...state.items, [action.payload.id]: { ...action.payload, state: 'pending' } } };

    case BOARD_UPDATED:
      return { ...state, items: { ...state.items, [action.payload.id]: { ...action.payload, state: 'present' } } };

    case BOARD_DELETED:
      return { ...state, items: { ...state.items, [action.payload.id]: { ...action.payload, state: 'deleted' } } };

    default:
      return state;
  }
};

export const reducer: Reducer<State> = combineReducers({
  boards,
});
