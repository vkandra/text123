const singleDocumentLogger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // MIDDLEWARE CODES
    if (typeof action !== 'function') {
      // console.log('ACTION_TYPE : ', action.type);
    }
    if (
      action.type === 'ARRANGE_KEYS_DATA'
    ) {
    //   if (Object.keys(action.data.Textracted_output)[0] === 'key-value') {
    //     var key_value = Object.keys(action.data.Textracted_output)[0];
    //     const { Keys, Values } = action.data.Textracted_output[key_value];
    //     console.log(Keys.length);
    //   }

    //   if (Object.keys(action.data.Edited_output)[0] === 'key-value') {
    //     var key_value = Object.keys(action.data.Edited_output)[0];
    //     const { Keys, Values } = action.data.Edited_output[key_value];
    //     console.log(Keys);
    //   }

      // prettier-ignore
    }
    next(action);
  };

export default singleDocumentLogger;
