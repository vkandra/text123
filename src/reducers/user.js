const initialUserState = {
  signUp: false,
  isLoggedIn: true,
  userFirstName: '',
  userLastName: '',
  userId: 0,
  token: '',
};

export default function user(state = initialUserState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
