const initialUserState = {
  isLoggedIn: false,
  userFirstName: '',
  userLastName: '',
  userId: 0,
};

export default function user(state = initialUserState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
