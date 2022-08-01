import {
  SIGN_UP_OPERATION,
  SIGN_IN_OPERATION,
  FORGOT_PASSWORD_CLICKED,
  PASS_SENT_TO_EMAIL,
  CHECK_REP_PASS,
} from '../actions/user';

const initialUserState = {
  signUp: false,
  isLoggedIn: true,
  userFirstName: '',
  userLastName: '',
  userId: 0,
  token: 'f6d86aa8-57d4-442a-b159-ee46e97df492',

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
    default:
      return state;
  }
}
