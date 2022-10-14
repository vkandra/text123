import { CHANGE_USER_LANG, FETCH_USER_LANG } from '../actions/themeLang';

const initialThemeLangState = {
  // LANGUAGE SELECTION
  selectedLanguage: 'en',

  languageWords: {},
};

export default function themeLang(state = initialThemeLangState, action) {
  switch (action.type) {
    case CHANGE_USER_LANG:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case FETCH_USER_LANG:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    default:
      return state;
  }
}
