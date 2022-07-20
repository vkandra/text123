import axios from 'axios';

// ACTION TYPES
// export const FETCH_SINGLE_FILE_DATA = 'FETCH_SINGLE_FILE_DATA';

// ACTION CREATORS
export function fetchSingleFileData(data) {
  return (dispatch) => {
    axios
      .get(`https://4xjuok1l6c.execute-api.ap-south-1.amazonaws.com/output`)
      .then((res) => {
        console.log(res.data);
      });
  };
}
