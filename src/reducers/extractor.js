import {
  CHANGE_TAB_OPERATION,
  CHANGE_TEXT_DATA_TAB_OPERATION,
  HANDLE_FILE_CHANGE,
  HANDLE_PROCESSED_FILE_TAB_CHANGE,
} from '../actions/extractor';

const extractorDocumentState = {
  selectedFileForUpload: {},
  page: 2,
  textDataTab: 1,
  processedFileTab: 1,
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
    default:
      return state;
  }
}
