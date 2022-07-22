import axios from 'axios';

// ACTION TYPES
export const ASSIGN_SINGLE_FILE_DATA = 'ASSIGN_SINGLE_FILE_DATA';

// ACTION CREATORS
export function fetchSingleFileData(data) {
  return (dispatch) => {
    axios
      .get(`https://4xjuok1l6c.execute-api.ap-south-1.amazonaws.com/output`)
      .then((res) => {
        // console.log(res.data);
        dispatch(assignSingleFileData(res.data));
        // console.log(assignSingleFileData(res.data))
      });
  };
}
export function assignSingleFileData(data) {
    // console.log(data);
  return {
    type: ASSIGN_SINGLE_FILE_DATA,
    data: data,
  };
}
