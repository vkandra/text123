import axios from 'axios';

// ACTION TYPES
export const SINGLE_DOC_DETAIL = 'SINGLE_DOC_DETAIL';
export const ASSIGN_SELECTED_DOC_DETAILS = 'ASSIGN_SELECTED_DOC_DETAILS';
export const ASSIGN_SINGLE_FILE_DATA = 'ASSIGN_SINGLE_FILE_DATA';
export const ARRANGE_KEYS_DATA = 'ARRANGE_KEYS_DATA';
export const ARRANGE_VALUES_DATA = 'ARRANGE_VALUES_DATA';
export const ARRANGE_KEYS_VALUES = 'ARRANGE_KEYS_VALUES';
export const ARRANGE_RAW_DATA = 'ARRANGE_RAW_DATA';
export const ARRANGE_TABLE_DATA = 'ARRANGE_TABLE_DATA';
export const ARRANGE_TABLES_ALL = 'ARRANGE_TABLES_ALL';
export const EDIT_KEYS_VALUES_RAW_DATA = 'EDIT_KEYS_VALUES_RAW_DATA';
export const ARRANGE_RAW_ALL = 'ARRANGE_RAW_ALL';
export const EDIT_TABLE_DATA = 'EDIT_TABLE_DATA';
export const SAVE_EDITED_KEYS_VALUES_RAW_DATA =
  'SAVE_EDITED_KEYS_VALUES_RAW_DATA';
export const SAVE_EDITED_TABLE_DATA = 'SAVE_EDITED_TABLE_DATA';

// ACTION CREATORS
export function fetchSingleFileData(data) {
  return (dispatch) => {
    axios
      .get(
        `https://4xjuok1l6c.execute-api.ap-south-1.amazonaws.com/output?user_id=${data[0]}&job_id=${data[1]}`
      )
      .then((res) => {
        // console.log(res.data);
        dispatch(assignSingleFileData(res.data));
        dispatch(arrangeKeysData(res.data));
        dispatch(arrangeValuesData(res.data));
        dispatch(arrangeKeysValues(res.data));
        dispatch(arrangeRawData(res.data));
        dispatch(arrangeTableData(res.data));
        dispatch(arrangeRawAll(res.data));
        dispatch(arrangeTablesAll(res.data));
        // console.log(assignSingleFileData(res.data));
      });
  };
}

export function singleDocDetail(data) {
  // console.log(data);
  return {
    type: SINGLE_DOC_DETAIL,
    data: data,
  };
}

export function assignSelectedDocDetails(data) {
  // console.log(data);
  return {
    type: ASSIGN_SELECTED_DOC_DETAILS,
    data: data,
  };
}
export function assignSingleFileData(data) {
  // console.log(data);
  return {
    type: ASSIGN_SINGLE_FILE_DATA,
    data: data,
  };
}

export function arrangeKeysData(data) {
  // console.log(data);
  return {
    type: ARRANGE_KEYS_DATA,
    data: data,
  };
}

export function arrangeValuesData(data) {
  // console.log(data);
  return {
    type: ARRANGE_VALUES_DATA,
    data: data,
  };
}

export function arrangeKeysValues(data) {
  // console.log(data);
  return {
    type: ARRANGE_KEYS_VALUES,
    data: data,
  };
}

export function arrangeRawAll(data) {
  // console.log(data);
  return {
    type: ARRANGE_RAW_ALL,
    data: data,
  };
}

export function arrangeRawData(data) {
  // console.log(data);
  return {
    type: ARRANGE_RAW_DATA,
    data: data,
  };
}

export function arrangeTableData(data) {
  // console.log(data);
  return {
    type: ARRANGE_TABLE_DATA,
    data: data,
  };
}

export function arrangeTablesAll(data) {
  // console.log(data);
  return {
    type: ARRANGE_TABLES_ALL,
    data: data,
  };
}

export function editKeysValuesRawData(data) {
  // console.log(data);
  return {
    type: EDIT_KEYS_VALUES_RAW_DATA,
    data: data,
  };
}

export function editTableData(data) {
  // console.log(data);
  return {
    type: EDIT_TABLE_DATA,
    data: data,
  };
}

export function saveEditedKeysValuesRawData(data) {
  // console.log(data);
  return {
    type: SAVE_EDITED_KEYS_VALUES_RAW_DATA,
    data: data,
  };
}

export function saveEditedTableData(data) {
  // console.log(data);
  return {
    type: SAVE_EDITED_TABLE_DATA,
    data: data,
  };
}
