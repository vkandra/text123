import axios from 'axios';

// ACTION TYPES
export const ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA =
  'ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA';
export const SELECT_DOCUMENTS_CONFIGURATION = 'SELECT_DOCUMENTS_CONFIGURATION';
export const UNSELECT_DOCUMENTS_CONFIGURATION =
  'UNSELECT_DOCUMENTS_CONFIGURATION';
export const ASSIGN_RAW_DOCUMENTS_DATA = 'ASSIGN_RAW_DOCUMENTS_DATA';
export const CLEAR_SELECTED_FILES = 'CLEAR_SELECTED_FILES';

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

export function clearSelectedFiles(data) {
  return {
    type: CLEAR_SELECTED_FILES,
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
        console.log('All Doc Details Fetched');
        dispatch(assignRawDocumentsData(res.data));
        dispatch(assignAllReceivedDocumentsData(res.data));
      });
  };
}
export function startExtractionProcessAPI(data) {
  return (dispatch) => {
    console.log(data);
    axios
      .post(
        `https://acx97vysu1.execute-api.ap-south-1.amazonaws.com/actionstart`,
        {
          user_id: data.user_id,
          doc_id: data.doc_id,
          doc_name: data.doc_name,
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(fetchRawDocumentsDetailsAPI(data.user_id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
