import axios from 'axios';

// ACTION TYPES
export const CHANGE_TAB_OPERATION = 'CHANGE_TAB_OPERATION';
export const CHANGE_TEXT_DATA_TAB_OPERATION = 'CHANGE_TEXT_DATA_TAB_OPERATION';
export const HANDLE_FILE_CHANGE = 'HANDLE_FILE_CHANGE';

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

export function uploadSelectedFiles(data) {
  return (dispatch) => {
    console.log(data);

    axios
      .put(`http://127.0.0.1:5000/output`, data, {
        headers: {
          'Content-Type': 'image/png',
        },
      })
      .then(
        (res) => {
          console.log(res.data);
          // dispatch(assignSingleFileData(res.data));
        },
        (err) => {
          console.log(err);
        }
      );
  };
}
