import axios from 'axios';

// ACTION TYPES
export const SIGN_IN_OPERATION = 'SIGN_IN_OPERATION';
export const SIGN_UP_OPERATION = 'SIGN_UP_OPERATION';
export const FORGOT_PASSWORD_CLICKED = 'FORGOT_PASSWORD_CLICKED';
export const PASS_SENT_TO_EMAIL = 'PASS_SENT_TO_EMAIL';
export const CHECK_REP_PASS = 'CHECK_REP_PASS';
export const CHECK_LOADING = 'CHECK_LOADING';
export const SET_USER_PREFERENCES = 'SET_USER_PREFERENCES';
export const SET_TEMPLATE_DATA = 'SET_TEMPLATE_DATA';
export const SET_SELECTED_MAIN_TEMPLATE = 'SET_SELECTED_MAIN_TEMPLATE';
export const SET_SUBTEMPLATES_DATA = 'SET_SUBTEMPLATES_DATA';
export const SET_SUBTEMPLATES_FILE_TABLE_DATA =
  'SET_SUBTEMPLATES_FILE_TABLE_DATA';

// ACTION CREATORS
export function signInOperation(data) {
  return {
    type: SIGN_IN_OPERATION,
    data: data,
  };
}
export function signUpOperation(data) {
  return {
    type: SIGN_UP_OPERATION,
    data: data,
  };
}
export function forgotPasswordClicked(data) {
  return {
    type: FORGOT_PASSWORD_CLICKED,
    data: data,
  };
}
export function passSentToEmail(data) {
  return {
    type: PASS_SENT_TO_EMAIL,
    data: data,
  };
}
export function checkRepPass(data) {
  return {
    type: CHECK_REP_PASS,
    data: data,
  };
}
export function checkLoading(data) {
  return {
    type: CHECK_LOADING,
    data: data,
  };
}
export function setUserPreferences(data) {
  return {
    type: SET_USER_PREFERENCES,
    data: data,
  };
}

export function setTemplateData(data) {
  return {
    type: SET_TEMPLATE_DATA,
    data: data,
  };
}

export function setSelectedMainTemplate(data) {
  return {
    type: SET_SELECTED_MAIN_TEMPLATE,
    data: data,
  };
}

export function setSubtemplatesData(data) {
  return {
    type: SET_SUBTEMPLATES_DATA,
    data: data,
  };
}

export function setSubtemplatesFileTableData(data) {
  return {
    type: SET_SUBTEMPLATES_FILE_TABLE_DATA,
    data: data,
  };
}

// API Calls
export function fetchTemplatesDataAPI(data) {
  return (dispatch) => {
    // console.log(data);
    axios
      .post(
        `https://8kis55n5f4.execute-api.ap-south-1.amazonaws.com/subtemp`,
        data
      )
      .then(function (response) {
        console.log(response);
        dispatch(setTemplateData(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
