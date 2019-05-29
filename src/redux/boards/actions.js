import { createAction } from 'redux-actions';
import { History } from 'history';
import {
  CREATE_BOARD,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
  CONNECT_BOARD,
  DISCONNECT_BOARD,
  LOAD_MY_BOARDS,
  VISIT_BOARD,
  UPDATE_BOARD_SETTINGS,
  EXPORT_BOARD,
  SET_USER_LABEL,
} from './types';

export const createBoard = createAction(CREATE_BOARD, (history: History) => ({ history }));
export const createBoardSuccess = createAction(CREATE_BOARD_SUCCESS, (id: string) => ({ id }));
export const createBoardError = createAction(CREATE_BOARD_ERROR, (error: Error) => error);
export const connectBoard = createAction(CONNECT_BOARD, (id: string) => ({ id }));
export const disconnectBoard = createAction(DISCONNECT_BOARD, (id: string) => ({ id }));
export const loadMyBoards = createAction(LOAD_MY_BOARDS);
export const visitBoard = createAction(VISIT_BOARD, (id: string) => ({ id }));
export const exportBoard = createAction(EXPORT_BOARD, (id: string, exporter: string) => ({ id, exporter }));
export const setUserLabel = createAction(SET_USER_LABEL, (boardId: string, label: string) => ({ boardId, label }));

export interface BoardSettings {
  label: string;
}

export const updateBoardSettings = createAction(UPDATE_BOARD_SETTINGS, (boardId: string, settings: BoardSettings) => ({
  boardId,
  settings,
}));
