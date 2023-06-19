import {
  SIGN_UP_OPERATION,
  SIGN_IN_OPERATION,
  FORGOT_PASSWORD_CLICKED,
  PASS_SENT_TO_EMAIL,
  CHECK_REP_PASS,
  CHECK_LOADING,
  SET_USER_PREFERENCES,
  SET_TEMPLATE_DATA,
  SET_SELECTED_MAIN_TEMPLATE,
  SET_SUBTEMPLATES_DATA,
  SET_SUBTEMPLATES_FILE_TABLE_DATA,
} from '../actions/user';

const initialUserState = {
  signUp: false,
  isLoggedIn: true,
  userFirstName: '',
  userLastName: '',
  fullName: '',
  token: 'AV123',
  // token: 'f6d86aa8-57d4-442a-b159-ee46e97df492',
  email: '',

  // SIGN IN SECTION
  signInEmail: '',
  signInPass: '',
  // FORGOT PASSWORD SECTION
  forgotPasswordClick: false,
  passSentToEmail: false,
  sentEmailNotFound: false,
  forgotPassEmail: '',
  // SIGN UP SECTION
  repeatPassVisible: false,
  repeatPass: false,
  signUpPass: '',
  loading: false,

  // USER PREFERENCES LIKE LANGUAGE, SORTING, THEME SELECTION
  preferences: [
    { language: 'en' },
    { theme: 'bright' },
    { sort: [{ value: 3 }, { asDs: 'Desc.' }] },
    [
      'ducumentName',
      'template_name',
      'sub_template_name',
      'documentUploadDate',
    ],
  ],

  // Templates Data
  selectedMainTemplate: 'Bills',
  subtemplatesData: [],
  templatesData: {
    user_id: '',
    template_details: [],
  },
  subTempFileTable: [],
};

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case SIGN_UP_OPERATION:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case SIGN_IN_OPERATION:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case FORGOT_PASSWORD_CLICKED:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case PASS_SENT_TO_EMAIL:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case CHECK_REP_PASS:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case CHECK_LOADING:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
        loading: action.data,
      };
    case SET_USER_PREFERENCES:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case SET_TEMPLATE_DATA:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
        templatesData: action.data,
      };
    case SET_SELECTED_MAIN_TEMPLATE:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
        selectedMainTemplate: action.data,
      };
    case SET_SUBTEMPLATES_DATA:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
        subtemplatesData: action.data,
      };
    case SET_SUBTEMPLATES_FILE_TABLE_DATA:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
        subTempFileTable: action.data,
      };
    default:
      return state;
  }
}
