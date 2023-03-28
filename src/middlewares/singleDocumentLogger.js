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
      //

      // let allFavouriteKeys;

      // let currentTemplate = String(action.data[2]).valueOf();
      // let templateNamesKeys = Object.keys(action.data[1]);
      // let templateNamesValues = Object.values(action.data[1]);

      // let subTemplate1 = action.data[3];
      // console.log(Object.keys(action.data[3]).length);

      // for (let i in templateNamesKeys) {
      //   if (currentTemplate === String(templateNamesKeys[i]).valueOf()) {
      //     let subTemplates = templateNamesValues[i];
      //     // console.log(subTemplates[0]);

      //     let subKeys = Object.keys(subTemplates[0]);
      //     let subValues = Object.values(subTemplates[0]);

      //     for (let j in subKeys) {
      //       if (subTemplate1 === String(subKeys[j]).valueOf()) {
      //         allFavouriteKeys = subValues[j];
      //         break;
      //       }
      //     }
      //   }
      // }

      var singleDocKeysValues = [];
      var singleDocKeysValuesPage = [];
      var templateSingleDocKeysValues = []; // Pagewise
      // let thisDocKeys = [];
      if (action.data[0].Textracted_output.keys_extracted_data.length !== 0) {
        for (
          var i = 0;
          i < action.data[0].Textracted_output.keys_extracted_data.length;
          i++
        ) {
          for (
            let j = 0;
            j < action.data[0].Textracted_output.keys_extracted_data[i].length;
            j++
          ) {
            singleDocKeysValues.push({
              index:
                action.data[0].Textracted_output.keys_extracted_data[i][j]
                  .index,
              key: action.data[0].Textracted_output.keys_extracted_data[i][j]
                .value,
              value:
                action.data[0].Textracted_output.values_extracted_data[i][j]
                  .value,
              editedKey:
                action.data[0].Edited_output.keys_extracted_data[i][j].value,
              editedValue:
                action.data[0].Edited_output.values_extracted_data[i][j].value,
              fvrt: action.data[0].Edited_output.keys_extracted_data[i][j].fvrt,
              page: action.data[0].Edited_output.keys_extracted_data[i][j].page,
              repeat:
                action.data[0].Edited_output.keys_extracted_data[i][j].repeat,
              secondary_index:
                action.data[0].Edited_output.keys_extracted_data[i][j]
                  .secondary_index,
            });
          }
          singleDocKeysValuesPage.push(singleDocKeysValues);
          singleDocKeysValues = [];
        }
      }

      templateSingleDocKeysValues = action.data[0].fvrt_kv_output;

      templateSingleDocKeysValues = templateSingleDocKeysValues.filter(
        (e) => e.length
      );
      let absentKeys = action.data[0].missing_keys;

      console.log(singleDocKeysValuesPage);

      // let allFavKeys = allFavouriteKeys.keys;
      // let absentKeys = [];

      // // console.log(thisDocKeys);

      // if (thisDocKeys.length === 0) {
      //   allFavKeys = allFavKeys.filter((item) => item !== '');

      //   absentKeys = allFavKeys;
      // } else {
      //   for (let i = 0; i < allFavKeys.length; i++) {
      //     for (let j = 0; j < thisDocKeys.length; j++) {
      //       if (
      //         String(allFavKeys[i]).valueOf() ===
      //         String(thisDocKeys[j]).valueOf()
      //       ) {
      //         break;
      //         // console.log('found');
      //         // allFavKeys = allFavKeys.filter((item) => item !== allFavKeys[j]);
      //       }
      //       if (j == thisDocKeys.length - 1) {
      //         if (String(allFavKeys[i]).valueOf() === '') {
      //           // allFavKeys = allFavKeys.filter((item) => item !== allFavKeys[j]);
      //           break;
      //         }
      //         absentKeys.push(allFavKeys[i]);
      //       }
      //     }
      //   }
      // absentKeys = allFavKeys;
      // }
      // console.log(allFavouriteKeys.keys);
      // console.log(absentKeys);

      // console.log(action.data);
      action.data = [
        singleDocKeysValuesPage,
        templateSingleDocKeysValues,
        absentKeys,
        // allFavouriteKeys.keys,
      ];
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
      //   console.log(
      //     action.data.Textracted_output.text_extracted_data_page_content[0][0]
      //   );
      if (action.data.Textracted_output.text_extracted_data_total_pages > 0) {
        for (
          i = 0;
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
      //   console.log(action.data);
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

      console.log(tableExtractedData, tableEditedData);
      action.data = [tableExtractedData, tableEditedData];
    }

    if (action.type === 'ARRANGE_TABLES_ALL') {
      //   console.log(
      //     action.data.Textracted_output.table_extracted_data_body[0][0]
      //   );
      // var allTableData = [];
      // if (action.data.Textracted_output.table_extracted_data_total > 0) {
      //   for (
      //     i = 0;
      //     i < action.data.Textracted_output.table_extracted_data_total;
      //     i++
      //   ) {
      //     allTableData.push({
      //       tableNum: i,
      //       tableHeader: [],
      //       tableData: [],
      //     });

      //     for (
      //       j = 0;
      //       j <
      //       action.data.Textracted_output.table_extracted_data_headers[i]
      //         .length;
      //       j++
      //     ) {
      //       allTableData[i].tableHeader.push({
      //         tableNum: i,
      //         rowNum: -1,
      //         index: j,
      //         type: 'header',
      //         data: action.data.Textracted_output.table_extracted_data_headers[
      //           i
      //         ][j],
      //         editedData:
      //           action.data.Edited_output.table_extracted_data_headers[i][j],
      //       });
      //     }

      //     for (
      //       j = 0;
      //       j <
      //       action.data.Textracted_output.table_extracted_data_body[i].length;
      //       j++
      //     ) {
      //       allTableData[i].tableData.push({
      //         index: j,
      //         rowData: [],
      //       });
      //       for (
      //         var k = 0;
      //         k <
      //         action.data.Textracted_output.table_extracted_data_body[i][j]
      //           .length;
      //         k++
      //       ) {
      //         allTableData[i].tableData[j].rowData.push({
      //           tableNum: i,
      //           rowNum: j,
      //           index: k,
      //           type: 'rowdata',
      //           data: action.data.Textracted_output.table_extracted_data_body[
      //             i
      //           ][j][k],
      //           editedData:
      //             action.data.Edited_output.table_extracted_data_body[i][j][k],
      //         });
      //       }
      //     }
      //   }
      // }

      console.log(action.data.Edited_output.table_extracted_data);
      action.data = action.data.Edited_output.table_extracted_data;
    }

    next(action);
  };

export default singleDocumentLogger;
