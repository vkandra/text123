import { allUsers } from '../tempdata/allUsers';

const userSignInOutUpLogger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // MIDDLEWARE CODES
    if (action.type === 'SIGN_UP_OPERATION') {
      console.log('ACTION_TYPE_USER_MIDDLEWARE = ', action.data);
      action.data.signUp = true;
      action.data.isLoggedIn = false;
      action.data.userId = 0;
      action.data.allUsers = allUsers;
    }
    if (action.type === 'SIGN_IN_OPERATION') {
      console.log('ACTION_TYPE_USER_MIDDLEWARE = ', action.data);
      action.data.signUp = false;
      action.data.isLoggedIn = false;
      action.data.userId = 0;
      action.data.allUsers = allUsers;
    }
    next(action);
  };

export default userSignInOutUpLogger;
