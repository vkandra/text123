import { combineReducers } from 'redux';
import documents from './documents';
import user from './user';
import singleDocument from './singleDocument';

export default combineReducers({
  documents: documents,
  singleDocument: singleDocument,
  user: user,
});
