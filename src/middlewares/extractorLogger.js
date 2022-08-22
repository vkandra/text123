const extractorLogger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // MIDDLEWARE CODES
    if (action.type === 'USER_EDITED_KVR_LIST') {
      // console.log(action.data);
    }
    next(action);
  };

export default extractorLogger;
