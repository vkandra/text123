import axios from 'axios';

// ACTION TYPES
export const CHANGE_TAB_OPERATION = 'CHANGE_TAB_OPERATION';
export const CHANGE_TEXT_DATA_TAB_OPERATION = 'CHANGE_TEXT_DATA_TAB_OPERATION';
export const HANDLE_FILE_CHANGE = 'HANDLE_FILE_CHANGE';
export const HANDLE_PROCESSED_FILE_TAB_CHANGE =
  'HANDLE_PROCESSED_FILE_TAB_CHANGE';
export const USER_EDITED_KVRT_LIST = 'USER_EDITED_KVRT_LIST';

// ACTION CREATORS
export function changeTabOperation(data) {
  return {
    type: CHANGE_TAB_OPERATION,
    data: data,
  };
}

export function changeTextDataTabOperation(data) {
  return {
    type: CHANGE_TEXT_DATA_TAB_OPERATION,
    data: data,
  };
}

export function handleFileChange(data) {
  return {
    type: HANDLE_FILE_CHANGE,
    data: data,
  };
}

export function handleProcessedFileTabChange(data) {
  return {
    type: HANDLE_PROCESSED_FILE_TAB_CHANGE,
    data: data,
  };
}

export function userEditedKVRTList(data) {
  // console.log(data);
  return {
    type: USER_EDITED_KVRT_LIST,
    data: data,
  };
}

export function postEditedDataAPI(data) {
  return (dispatch) => {
    console.log(data);
    axios
      .post(
        `https://acx97vysu1.execute-api.ap-south-1.amazonaws.com/actionstart`,
        data
      )
      .then(function (response) {
        console.log(response);
        // dispatch(fetchRawDocumentsDetailsAPI(data.user_id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
