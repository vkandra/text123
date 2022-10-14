import { combineReducers } from 'redux';
import documents from './documents';
import user from './user';
import singleDocument from './singleDocument';
import extractor from './extractor';
import themeLang from './themeLang';

export default combineReducers({
  documents: documents,
  singleDocument: singleDocument,
  user: user,
  extractor: extractor,
  themeLang: themeLang,
});
