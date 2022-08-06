const singleDocumentLogger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // MIDDLEWARE CODES
    if (typeof action !== 'function') {
      // console.log('ACTION_TYPE : ', action.type);
    }
    if (action.type === 'ASSIGN_SINGLE_FILE_DATA') {
      var extractedData = action.data.Textracted_output;
      var editedData = action.data.Edited_output;

      action.data = [extractedData, editedData];
    }
    if (action.type === 'ARRANGE_KEYS_DATA') {
      var keysExtractedData = action.data.Textracted_output.keys_extracted_data;
      var keysEditedData = action.data.Edited_output.keys_extracted_data;

      action.data = [keysExtractedData, keysEditedData];
    }
    if (action.type === 'ARRANGE_VALUES_DATA') {
      var valuesExtractedData =
        action.data.Textracted_output.values_extracted_data;
      var valuesEditedData = action.data.Edited_output.values_extracted_data;
      action.data = [valuesExtractedData, valuesEditedData];
    }
    if (action.type === 'ARRANGE_KEYS_VALUES') {
      var singleDocKeysValues = [];
      //   singleDocKeysValues.push({
      //     index: -1,
      //     key: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      //     value:
      //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      //     editedKey:
      //       'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      //     editedValue:
      //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      //   });
      //   console.log(action.data.Textracted_output.keys_extracted_data.length);
      if (action.data.Textracted_output.keys_extracted_data.length !== 0) {
        for (
          var i = 0;
          i < action.data.Textracted_output.keys_extracted_data.length;
          i++
        ) {
          singleDocKeysValues.push({
            index: action.data.Textracted_output.keys_extracted_data[i].index,
            key: action.data.Textracted_output.keys_extracted_data[i].value,
            value: action.data.Textracted_output.values_extracted_data[i].value,
            editedKey: action.data.Edited_output.keys_extracted_data[i].value,
            editedValue:
              action.data.Edited_output.values_extracted_data[i].value,
          });
        }
      }

      action.data = singleDocKeysValues;
    }
    if (action.type === 'ARRANGE_RAW_DATA') {
      var rawDataExtractedData = [];
      rawDataExtractedData.push(
        action.data.Textracted_output.text_extracted_data_total_pages
      );
      rawDataExtractedData.push(
        action.data.Textracted_output.text_extracted_data_page_content
      );

      var rawDataEditedData = [];
      rawDataEditedData.push(
        action.data.Edited_output.text_extracted_data_total_pages
      );
      rawDataEditedData.push(
        action.data.Edited_output.text_extracted_data_page_content
      );

      action.data = [rawDataExtractedData, rawDataEditedData];
    }

    if (action.type === 'ARRANGE_RAW_ALL') {
      var singleDocRawAllData = [];
      //   singleDocKeysValues.push({
      //     index: -1,
      //     text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      //     editedText:
      //       'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      //   });
      //   console.log(
      //     action.data.Textracted_output.text_extracted_data_page_content[0][0]
      //   );
      if (action.data.Textracted_output.text_extracted_data_total_pages > 0) {
        for (
          var i = 0;
          i < action.data.Textracted_output.text_extracted_data_total_pages;
          i++
        ) {
          singleDocRawAllData.push({
            page: i,
            pageData: [],
          });
          for (
            var j = 0;
            j <
            action.data.Textracted_output.text_extracted_data_page_content[i]
              .length;
            j++
          ) {
            singleDocRawAllData[i].pageData.push({
              index:
                action.data.Textracted_output.text_extracted_data_page_content[
                  i
                ][j].index,
              page: i,
              text: action.data.Textracted_output
                .text_extracted_data_page_content[i][j].value,
              editedText:
                action.data.Edited_output.text_extracted_data_page_content[i][j]
                  .value,
            });
          }
        }
      }

      action.data = singleDocRawAllData;
      console.log(action.data);
    }

    if (action.type === 'ARRANGE_TABLE_DATA') {
      var tableExtractedData = [];
      tableExtractedData.push(
        action.data.Textracted_output.table_extracted_data_total
      );
      tableExtractedData.push(
        action.data.Textracted_output.table_extracted_data_headers
      );
      tableExtractedData.push(
        action.data.Textracted_output.table_extracted_data_body
      );

      var tableEditedData = [];
      tableEditedData.push(
        action.data.Edited_output.table_extracted_data_total
      );
      tableEditedData.push(
        action.data.Edited_output.table_extracted_data_headers
      );
      tableEditedData.push(action.data.Edited_output.table_extracted_data_body);

      action.data = [tableExtractedData, tableEditedData];
    }

    next(action);
  };

export default singleDocumentLogger;
