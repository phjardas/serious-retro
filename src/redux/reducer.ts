import { Reducer, combineReducers } from 'redux';

import { State, Boards, ErrorInfo, Cards, User } from './state';
import {
  INIT_USER,
  CREATE_BOARD,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
  BOARD_PENDING,
  BOARD_UPDATED,
  BOARD_DELETED,
  CARD_ADDED,
  CARD_UPDATED,
  CARD_DELETED,
} from './types';

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
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: { ...action.payload.data, id: action.payload.id, state: 'present' } },
      };

    case BOARD_DELETED:
      return { ...state, items: { ...state.items, [action.payload.id]: { ...action.payload, state: 'deleted' } } };

    default:
      return state;
  }
};

const cards: Reducer<Cards> = (state = {}, action) => {
  switch (action.type) {
    case CARD_ADDED:
    case CARD_UPDATED:
      return {
        ...state,
        [action.payload.boardId]: {
          ...(state[action.payload.boardId] || {}),
          [action.payload.id]: {
            ...action.payload.data,
            id: action.payload.id,
          },
        },
      };

    case CARD_DELETED:
      return {
        ...state,
        [action.payload.boardId]: {
          ...(state[action.payload.boardId] || {}),
          [action.payload.id]: undefined,
        },
      };

    default:
      return state;
  }
};

const user: Reducer<User | null> = (state = null, action) => {
  switch (action.type) {
    case INIT_USER:
      return action.payload;
    default:
      return state;
  }
};

export const reducer: Reducer<State> = combineReducers({ boards, cards, user });
