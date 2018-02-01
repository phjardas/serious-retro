import { createAction } from 'redux-actions';
import { History } from 'history';
import {
  CREATE_BOARD,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
  CONNECT_BOARD,
  DISCONNECT_BOARD,
  CREATE_CARD,
  EDIT_CARD,
  ABORT_CARD,
  SAVE_CARD,
  DELETE_CARD,
  LOAD_MY_BOARDS,
} from './types';

export const createBoard = createAction(CREATE_BOARD, (history: History) => ({ history }));
export const createBoardSuccess = createAction(CREATE_BOARD_SUCCESS, (id: string) => ({ id }));
export const createBoardError = createAction(CREATE_BOARD_ERROR, (error: Error) => error);
export const connectBoard = createAction(CONNECT_BOARD, (id: string) => ({ id }));
export const disconnectBoard = createAction(DISCONNECT_BOARD, (id: string) => ({ id }));
export const createCard = createAction(CREATE_CARD, (payload: { boardId: string; categoryId: string }) => payload);
export const editCard = createAction(EDIT_CARD, (payload: { boardId: string; cardId: string }) => payload);
export const abortCard = createAction(ABORT_CARD, (payload: { boardId: string; cardId: string }) => payload);
export const saveCard = createAction(SAVE_CARD, (payload: { boardId: string; cardId?: string; content: string }) => payload);
export const deleteCard = createAction(DELETE_CARD, (payload: { boardId: string; cardId: string }) => payload);
export const loadMyBoards = createAction(LOAD_MY_BOARDS);
