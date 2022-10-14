// import axios from 'axios';

// ACTION TYPES
export const CHANGE_USER_LANG = 'CHANGE_USER_LANG';
export const FETCH_USER_LANG = 'FETCH_USER_LANG';

// ACTION CREATORS
export function changeUserLang(data) {
  return {
    type: CHANGE_USER_LANG,
    data: data,
  };
}

export function fetchUserLang(data) {
  return {
    type: FETCH_USER_LANG,
    data: data,
  };
}
