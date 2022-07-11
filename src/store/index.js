import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const useLogger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // MIDDLEWARE CODES
    if (typeof action !== 'function') {
      console.log('ACTION_TYPE = ', action.type);
    }
    next(action);
  };

let store;

export function configureStore() {
  store = createStore(reducer, applyMiddleware(logger, thunk, useLogger));

  return store;
}
