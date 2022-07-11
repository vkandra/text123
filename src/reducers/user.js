import { SIGN_UP_OPERATION, SIGN_IN_OPERATION } from '../actions/user';

const initialUserState = {
  signUp: false,
  isLoggedIn: true,
  userFirstName: '',
  userLastName: '',
  userId: 0,
  token: '',
  allUsers: [],
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
