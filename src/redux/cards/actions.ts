import { createAction } from 'redux-actions';
import { SYNCHRONIZE_CARDS, CREATE_CARD, EDIT_CARD, ABORT_CARD, SAVE_CARD, DELETE_CARD } from './types';

export const synchronizeCards = createAction(SYNCHRONIZE_CARDS, (payload: { boardId: string }) => payload);
export const createCard = createAction(CREATE_CARD, (payload: { boardId: string; categoryId: string }) => payload);
export const editCard = createAction(EDIT_CARD, (payload: { boardId: string; cardId: string }) => payload);
export const abortCard = createAction(ABORT_CARD, (payload: { boardId: string; cardId: string }) => payload);
export const saveCard = createAction(SAVE_CARD, (payload: { boardId: string; cardId?: string; content: string }) => payload);
export const deleteCard = createAction(DELETE_CARD, (payload: { boardId: string; cardId: string }) => payload);
