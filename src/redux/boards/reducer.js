import { Reducer } from 'redux';

import { Boards } from './state';
import {
  CREATE_BOARD,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
  BOARD_PENDING,
  BOARD_UPDATED,
  BOARD_DELETED,
  MY_BOARD_UPDATE,
  MY_BOARD_DELETE,
} from './types';
import { renderError, deleteProperty } from '../common/reducer';

export const reducer: Reducer<Boards> = (state = { items: {}, mine: {} }, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      return {
        ...state,
        creation: { pending: true },
      };

    case CREATE_BOARD_SUCCESS:
      return {
        ...state,
        creation: { pending: false, ...action.payload },
      };

    case CREATE_BOARD_ERROR:
      return {
        ...state,
        creation: { pending: false, error: renderError(action.payload) },
      };

    case BOARD_PENDING:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: { ...action.payload, state: 'pending' } },
      };

    case BOARD_UPDATED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: { ...action.payload.data, id: action.payload.id, state: 'present' },
        },
      };

    case BOARD_DELETED:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: { ...action.payload, state: 'deleted' } },
      };

    case MY_BOARD_UPDATE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...action.payload.data,
            id: action.payload.id,
            state: 'present',
          },
        },
        mine: { ...state.mine, [action.payload.id]: true },
      };

    case MY_BOARD_DELETE:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: { ...action.payload, state: 'deleted' } },
        mine: deleteProperty(state.mine, action.payload.id),
      };

    default:
      return state;
  }
};
