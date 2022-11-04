import axios from 'axios';
import { fetchSingleFileData } from './singleDocument';

// ACTION TYPES
export const CHANGE_TAB_OPERATION = 'CHANGE_TAB_OPERATION';
export const CHANGE_TEXT_DATA_TAB_OPERATION = 'CHANGE_TEXT_DATA_TAB_OPERATION';
export const HANDLE_FILE_CHANGE = 'HANDLE_FILE_CHANGE';
export const HANDLE_PROCESSED_FILE_TAB_CHANGE =
  'HANDLE_PROCESSED_FILE_TAB_CHANGE';
export const USER_EDITED_KVRT_LIST = 'USER_EDITED_KVRT_LIST';
export const CLEAR_EDITED_KVRT_LIST = 'CLEAR_EDITED_KVRT_LIST';

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

export function clearEditedKVRTList(data) {
  // console.log(data);
  return {
    type: CLEAR_EDITED_KVRT_LIST,
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

        const refreshDocData = [
          data.user_id,
          data.doc_id,
          data.templateDetails,
        ];
        dispatch(fetchSingleFileData(refreshDocData));
        // dispatch(fetchRawDocumentsDetailsAPI(data.user_id));
        dispatch(clearEditedKVRTList([]));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function downloadEditedDataAPI(data) {
  return (dispatch) => {
    console.log(data);
    axios
      .post(
        `https://kpud7rol28.execute-api.ap-south-1.amazonaws.com/download`,
        data
      )
      .then(function (response) {
        console.log(response.data.output_download_link);
        dispatch(
          downloadZipOfExcelFilesAPI(response.data.output_download_link)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function downloadZipOfExcelFilesAPI(data) {
  return (dispatch) => {
    const fileName = data.split('/');
    console.log(data.split('/')[6]);
    axios({
      url: data, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', fileName[6]); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };
}
