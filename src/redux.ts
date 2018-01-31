import { createStore, Reducer, StoreEnhancer } from 'redux';

export interface State {}

const reducer: Reducer<State> = (state, action) => {
  return state;
};

// tslint:disable-next-line:no-any
const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
const enhancer: StoreEnhancer<State> = typeof devToolsExtension === 'function' && devToolsExtension();

export const store = createStore(reducer, enhancer);
