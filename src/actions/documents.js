import axios from 'axios';

// ACTION TYPES
export const ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA =
  'ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA';
export const SELECT_DOCUMENTS_CONFIGURATION = 'SELECT_DOCUMENTS_CONFIGURATION';
export const UNSELECT_DOCUMENTS_CONFIGURATION =
  'UNSELECT_DOCUMENTS_CONFIGURATION';
export const ASSIGN_RAW_DOCUMENTS_DATA = 'ASSIGN_RAW_DOCUMENTS_DATA';
export const CLEAR_SELECTED_FILES = 'CLEAR_SELECTED_FILES';
export const ASSIGN_DASHBOARD_DATA = 'ASSIGN_DASHBOARD_DATA';

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

export function assignDashboardData(data) {
  return {
    type: ASSIGN_DASHBOARD_DATA,
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
        `https://qti3aekf4g.execute-api.ap-south-1.amazonaws.com/test/execution`,
        data
      )
      .then(function (response) {
        console.log(response);
        dispatch(fetchRawDocumentsDetailsAPI(data.user_id));
        dispatch(clearSelectedFiles());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function stopExtractionProcessAPI(data) {
  return (dispatch) => {
    console.log(data);
    axios
      .post(
        `https://owjstza5rc.execute-api.ap-south-1.amazonaws.com/stop`,
        data
      )
      .then(function (response) {
        console.log(response);
        dispatch(fetchRawDocumentsDetailsAPI(data.user_id));
        dispatch(clearSelectedFiles());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function deleteFilesDataAPI(data) {
  return (dispatch) => {
    console.log(data);
    axios
      .post(
        `https://npf3th07e5.execute-api.ap-south-1.amazonaws.com/delete`,
        data
      )
      .then(function (response) {
        console.log(response);
        dispatch(fetchRawDocumentsDetailsAPI(data.user_id));
        dispatch(clearSelectedFiles());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
