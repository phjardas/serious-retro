import { Reducer } from 'redux';

import { Cards } from './state';
import { CARD_ADDED, CARD_UPDATED, CARD_DELETED } from './types';
import { deleteProperty } from '../common/reducer';

export const reducer: Reducer<Cards> = (state = {}, action) => {
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
        [action.payload.boardId]: deleteProperty(state[action.payload.boardId] || {}, action.payload.id),
      };

    default:
      return state;
  }
};
