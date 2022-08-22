import {
  CHANGE_TAB_OPERATION,
  CHANGE_TEXT_DATA_TAB_OPERATION,
  HANDLE_FILE_CHANGE,
  HANDLE_PROCESSED_FILE_TAB_CHANGE,
  USER_EDITED_KVRT_LIST,
} from '../actions/extractor';

const extractorDocumentState = {
  selectedFileForUpload: {},
  page: 1,
  textDataTab: 1,
  // 1 is for Not Processed and 2 is for Processed
  processedFileTab: 1,
  // ALL THE EDITS MADE BY USER DURING SESSION
  userEditedKeyValueRawTable: [],
  // userEditedTable: [],
};

export default function extractor(state = extractorDocumentState, action) {
  switch (action.type) {
    case CHANGE_TAB_OPERATION:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case CHANGE_TEXT_DATA_TAB_OPERATION:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case HANDLE_FILE_CHANGE:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case HANDLE_PROCESSED_FILE_TAB_CHANGE:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case USER_EDITED_KVRT_LIST:
      // console.log(action.data);
      extractorDocumentState.userEditedKeyValueRawTable.push(action.data);
      return {
        ...state,
      };
    default:
      return state;
  }
}
