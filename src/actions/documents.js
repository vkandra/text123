import axios from 'axios';

// ACTION TYPES
export const ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA =
  'ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA';
export const SELECT_DOCUMENTS_CONFIGURATION = 'SELECT_DOCUMENTS_CONFIGURATION';
export const UNSELECT_DOCUMENTS_CONFIGURATION =
  'UNSELECT_DOCUMENTS_CONFIGURATION';
export const ASSIGN_RAW_DOCUMENTS_DATA = 'ASSIGN_RAW_DOCUMENTS_DATA';

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

export function assignRawDocumentsData(data) {
  return {
    type: ASSIGN_RAW_DOCUMENTS_DATA,
    data: data,
  };
}

// API CALLS WITH THUNK AND AXIOS
export function fetchRawDocumentsDetailsAPI(data) {
  return (dispatch) => {
    axios
      .get(
        `https://3qyg266ncc.execute-api.ap-south-1.amazonaws.com/doc_output?id=${data}`
      )
      .then((res) => {
        // console.log(res.data);
        dispatch(assignRawDocumentsData(res.data));
        dispatch(assignAllReceivedDocumentsData(res.data));
      });
  };
}
