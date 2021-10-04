import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';

/** Root Reducer */
import { rootReducer } from './rootReducer';

/** Types */
import { Dispatch } from '../@types/store.type';

const middleware = [thunk];

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const store: Store<unknown> & { dispatch: Dispatch } = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose,
  ),
);

export default store;
