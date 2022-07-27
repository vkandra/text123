import { SIGN_UP_OPERATION, SIGN_IN_OPERATION } from '../actions/user';

const initialUserState = {
  signUp: false,
  isLoggedIn: true,
  userFirstName: '',
  userLastName: '',
  userId: 0,
  token: 'f6d86aa8-57d4-442a-b159-ee46e97df492',
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
    default:
      return state;
  }
}
