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
export const UPDATE_TEMPLATE_NAMES = 'UPDATE_TEMPLATE_NAMES';
export const UPDATE_SUBTEMPLATE_NAMES = 'UPDATE_SUBTEMPLATE_NAMES';
export const SORT_BY_DATA = 'SORT_BY_DATA';
export const SEARCH_BY_DATA = 'SEARCH_BY_DATA';

// ACTION CREATORS
export function assignAllReceivedDocumentsData(data, preferences) {
  return {
    type: ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA,
    data: data,
    preferences: preferences,
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

export function updateTemplateNames(data) {
  return {
    type: UPDATE_TEMPLATE_NAMES,
    data: data,
  };
}

export function updateSubTemplateNames(data) {
  return {
    type: UPDATE_SUBTEMPLATE_NAMES,
    data: data,
  };
}

export function sortByData(data) {
  return {
    type: SORT_BY_DATA,
    data: data,
  };
}
export function searchByData(data) {
  return {
    type: SEARCH_BY_DATA,
    data: data,
  };
}

// API CALLS WITH THUNK AND AXIOS
export function fetchRawDocumentsDetailsAPI(data, preferences) {
  return (dispatch) => {
    axios
      .get(
        // `https://3qyg266ncc.execute-api.ap-south-1.amazonaws.com/doc_output?id=${data}`
        `https://functionstexextraction.azurewebsites.net/api/TextExtraction/DocumentDetailsMainTable?id=${data}`
      )
      .then((res) => {
        console.log('All Doc Details Fetched');
        // console.log(res.data);
        dispatch(assignRawDocumentsData(res.data));
        dispatch(assignAllReceivedDocumentsData(res.data, preferences));
      });
  };
}
export function startExtractionProcessAPI(data) {
  return (dispatch) => {
    // console.log(data);
    axios
      .post(
        `https://qti3aekf4g.execute-api.ap-south-1.amazonaws.com/test/execution`,
        data
      )
      .then(function (response) {
        console.log(response);
        dispatch(clearSelectedFiles());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function stopExtractionProcessAPI(data) {
  return (dispatch) => {
    // console.log(data);
    axios
      .post(
        `https://owjstza5rc.execute-api.ap-south-1.amazonaws.com/stop`,
        data
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          fetchRawDocumentsDetailsAPI(data.user_id, data.user_preferences)
        );
        dispatch(clearSelectedFiles());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function deleteFilesDataAPI(data) {
  return (dispatch) => {
    // console.log(data);
    axios
      .post(
        // `https://npf3th07e5.execute-api.ap-south-1.amazonaws.com/delete`,
        `https://functionstexextraction.azurewebsites.net/api/DeleteDocumentAPI`,
        data
      )
      .then(function (response) {
        console.log(response);
        dispatch(clearSelectedFiles());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function fetchTemplateNamesAPI(data) {
  return (dispatch) => {
    console.log(data);
    axios
      .post(
        `https://lqshj05gd9.execute-api.ap-south-1.amazonaws.com/Textract_document_category`,
        data
      )
      .then(function (response) {
        console.log(response.data);
        console.log(Object.keys(data).length);
        // if (Object.keys(data).length === 1) {
        if (response.data.user_id === data.user_id) {
          dispatch(updateTemplateNames(response.data.Document_category));
        } else {
          console.log(
            'User Id mismatch, asked templates for ' +
              data.user_id +
              ', instead recieving for ' +
              response.data.user_id
          );
        }
        // dispatch(clearSelectedFiles());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
