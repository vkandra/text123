const extractorLogger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // MIDDLEWARE CODES
    if (typeof action !== 'function') {
      // console.log('ACTION_TYPE : ', action.type);
    }
    next(action);
  };

export default extractorLogger;
