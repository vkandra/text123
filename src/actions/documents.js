// import axios from 'axios';

// ACTION TYPES
export const ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA =
  'ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA';
export const SELECT_DOCUMENTS_CONFIGURATION = 'SELECT_DOCUMENTS_CONFIGURATION';
export const UNSELECT_DOCUMENTS_CONFIGURATION =
  'UNSELECT_DOCUMENTS_CONFIGURATION';

// ACTION CREATORS
export function assignAllReceivedDocumentsData(data) {
  return {
    type: ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA,
    data: data,
  };
}

export function selectDocumentsConfiguration(data) {
  return {
    type: SELECT_DOCUMENTS_CONFIGURATION,
    data: data,
  };
}

export function unselectDocumentsConfiguration(data) {
  return {
    type: UNSELECT_DOCUMENTS_CONFIGURATION,
    data: data,
  };
}
