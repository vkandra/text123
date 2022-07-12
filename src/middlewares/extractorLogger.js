const extractorLogger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // MIDDLEWARE CODES
    if (action.type === 'CHANGE_TAB_OPERATION') {
      console.log('ACTION_TYPE_USER_MIDDLEWARE = ', action);
    }
    next(action);
  };

export default extractorLogger;
