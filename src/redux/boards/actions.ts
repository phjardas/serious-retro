import { createAction } from 'redux-actions';
import { History } from 'history';
import { CREATE_BOARD, CREATE_BOARD_SUCCESS, CREATE_BOARD_ERROR, CONNECT_BOARD, DISCONNECT_BOARD, LOAD_MY_BOARDS } from './types';

export const createBoard = createAction(CREATE_BOARD, (history: History) => ({ history }));
export const createBoardSuccess = createAction(CREATE_BOARD_SUCCESS, (id: string) => ({ id }));
export const createBoardError = createAction(CREATE_BOARD_ERROR, (error: Error) => error);
export const connectBoard = createAction(CONNECT_BOARD, (id: string) => ({ id }));
export const disconnectBoard = createAction(DISCONNECT_BOARD, (id: string) => ({ id }));
export const loadMyBoards = createAction(LOAD_MY_BOARDS);
