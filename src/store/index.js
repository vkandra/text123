import { applyMiddleware, createStore } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import userSignInOutUpLogger from '../middlewares/userSignInOutUpLogger';
import { composeWithDevTools } from 'redux-devtools-extension';
import extractorLogger from '../middlewares/extractorLogger';
import documentsLogger from '../middlewares/documentsLogger';
import singleDocumentLogger from '../middlewares/singleDocumentLogger';

let store;

export function configureStore() {
  store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        userSignInOutUpLogger,
        extractorLogger,
        documentsLogger,
        singleDocumentLogger
      )
    )
  );

  return store;
}
