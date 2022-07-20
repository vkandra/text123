import { ASSIGN_SINGLE_FILE_DATA } from '../actions/singleDocument';

const initialsingleDocumentState = {
  singleDocumentId: 0,
  singleDocumentName: '',
  singleDocumentType: '',
  singleDocumentTotalPages: 0,
  singleDocumentPrimaryContent: [],
  singleDocumentSecondaryContent: [],
  singleDocumentPrimaryKeyValue: [],
  singleDocumentSecondaryKeyValue: [],
  singleDocumentPrimaryTables: [],
  singleDocumentSecondaryTables: [],
  singleDocumentPrimaryRawData: [],
  singleDocumentSecondaryRawData: [],
};

export default function singleDocument(
  state = initialsingleDocumentState,
  action
) {
  switch (action.type) {
    case ASSIGN_SINGLE_FILE_DATA:
      // console.log(action.data);
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
        singleDocumentPrimaryContent: action.data,
      };
    default:
      return state;
  }
}
