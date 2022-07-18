import { CHANGE_TAB_OPERATION } from '../actions/extractor';
import { CHANGE_TEXT_DATA_TAB_OPERATION } from '../actions/extractor';

const extractorDocumentState = {
  page: 2,
  textDataTab: 1,
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
    default:
      return state;
  }
}