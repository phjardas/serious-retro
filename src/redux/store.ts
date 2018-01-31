import { compose, createStore, applyMiddleware, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { State } from './state';
import { reducer } from './reducer';
import { rootSaga } from './saga';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const enhancer: StoreEnhancer<State> = composeEnhancers(applyMiddleware(sagaMiddleware));

export const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);
