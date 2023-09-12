import {
  ASSIGN_SINGLE_FILE_DATA,
  ARRANGE_KEYS_DATA,
  ARRANGE_VALUES_DATA,
  ARRANGE_KEYS_VALUES,
  ARRANGE_RAW_DATA,
  ARRANGE_TABLE_DATA,
  ARRANGE_TABLES_ALL,
  ASSIGN_SELECTED_DOC_DETAILS,
  EDIT_KEYS_VALUES_RAW_DATA,
  EDIT_TABLE_DATA,
  SAVE_EDITED_KEYS_VALUES_RAW_DATA,
  ARRANGE_RAW_ALL,
  SAVE_EDITED_TABLE_DATA,
  SINGLE_DOC_DETAIL,
  DROPDOWN_SELECTED,
  UPDATE_TEMPLATE_DETAILS,
  SAVE_SUBTEMP_TEMPLATE_DETAILS,
  // SAVE_BLOB_EXCEL_DETAILS,
} from '../actions/singleDocument';

const initialsingleDocumentState = {
  singleDocumentId: 0,
  singleDocumentName: '',
  singleDocumentType: '',
  singleDocumentTotalPages: 0,
  singleDocumentSize: 0,
  singleDocumentUploadDate: '',
  singleDocumentStatus: '',
  singleDocumentDownloadLink: '',
  singleDocumentTemplate: '',
  singleDocumentSubTemplate: '',

  selectedDocumentsDetails: [],
  dropdownSelected: 0,
  // ALL CONTENT
  singleDocumentTextractedContent: [],
  singleDocumentEditedContent: [],
  // KEYS
  singleDocumentTextractedKey: [],
  singleDocumentEditedKey: [],
  // VALUES
  singleDocumentTextractedValue: [],
  singleDocumentEditedValue: [],
  // KEYS VALUES - REARRANGED
  singleDocKeysValues: [],
  // TEMPLATE KEYS VALUES - REARRANGED
  templateSingleDocKeysValues: [],
  // TABLES
  singleDocumentTextractedTables: [],
  singleDocumentEditedTables: [],
  // TABLES - REARRANGED
  singleDocTablesAll: [],
  // RAW DATA
  singleDocumentTextractedRawData: [],
  singleDocumentEditedRawData: [],
  // RAW DATA - REARRANGED
  singleDocRawAll: [],
  // Edited Single Cell Keys Values Rawdata
  editedKeysValuesRawData: {
    type: '',
    pageNo: -1,
    index: -1,
    text: '',
    repeat: 0,
    secondary_index: 0,
  },
  // Edited Single Cell Table data
  editedTableData: {
    type: '',
    tableNum: 0,
    rowNum: -1,
    index: -1,
    text: '',
  },
  templateDetails: {},
  templateAllKeys: [],
  templateUnusedKeys: [],
  templateDetails2: {
    Bills: [
      {
        Template2: {
          keys: ['', 'BALANCE', 'Credit Purchase'],
          table: [],
          raw: [],
        },
      },
    ],
    Report: [
      {
        Template1: {
          keys: [
            '',
            '23% NET:',
            'A + B - 1 (the increase in the index of Material and in the index of Labor represent 188% of the raises taken into account)',
            'A=',
            'Admin',
            'Assuming a 2012 unit price of $70.88 (rounded to $7100 table below) for Ball end-wire rope. awaging. the formula calculation for 2015 1a as follows:',
            'Host:',
            'P2013',
            'PINC will therefore absorb the increase according to section',
            'Program Name',
            'The difference 1a 0.2%. According to section 2.6. the increase would be applied as follows:',
            'The difference is 18.5%. which falle under section 2.7. Hance, the sacalation will be applied as follown:',
            'The numbers in Table 2 are used for hypothetical purposen.',
            'The parties shall agree on apecific lot size per part number which may be amonded from',
            'VAT:',
          ],
          table: [],
          raw: [],
        },
        Hello: {
          keys: [
            '',
            'BALANCE',
            'Credit Purchase',
            'Assuming a 2012 unit price of $70.88 (rounded to $7100 table below) for Ball end-wire rope. awaging. the formula calculation for 2015 1a as follows:',
            'Host:',
          ],
          table: [],
          raw: [],
        },
        World: {
          keys: ['', 'BALANCE', 'Credit Purchase'],
          table: [],
          raw: [],
        },
        Default: {
          keys: ['', 'BALANCE', 'Credit Purchase'],
          table: [],
          raw: [],
        },
      },
    ],
    others: [
      {
        Default: {
          keys: ['', 'BALANCE', 'Credit Purchase'],
          table: [],
          raw: [],
        },
      },
    ],
  },
  saveSubTempDetails: [],
  blobExcelDetails: {
    storageAccountName: '',
    containerName: '',
    subdirectory_name: '',
    inner_subdirectory_name: '',
  },
};

export default function singleDocument(
  state = initialsingleDocumentState,
  action
) {
  switch (action.type) {
    case SINGLE_DOC_DETAIL:
      // console.log(action.data);
      return {
        ...state,
      };
    case ASSIGN_SELECTED_DOC_DETAILS:
      // console.log(action.data);
      return {
        ...state,
        selectedDocumentsDetails: action.data,
      };
    case ASSIGN_SINGLE_FILE_DATA:
      // console.log(action.data);
      return {
        ...state,
        singleDocumentTextractedContent: action.data[0],
        singleDocumentEditedContent: action.data[1],
      };
    case ARRANGE_KEYS_DATA:
      // console.log(action.data);
      return {
        ...state,
        singleDocumentTextractedKey: action.data[0],
        singleDocumentEditedKey: action.data[1],
      };
    case ARRANGE_VALUES_DATA:
      // console.log(action.data);
      return {
        ...state,
        singleDocumentTextractedValue: action.data[0],
        singleDocumentEditedValue: action.data[1],
      };
    case ARRANGE_KEYS_VALUES:
      // console.log(action.data);
      return {
        ...state,
        singleDocKeysValues: action.data[0],
        templateSingleDocKeysValues: action.data[1],
        templateUnusedKeys: action.data[2],
        // templateAllKeys: action.data[3],
      };
    case ARRANGE_RAW_DATA:
      // console.log(action.data);
      return {
        ...state,
        singleDocumentTextractedRawData: action.data[0],
        singleDocumentEditedRawData: action.data[1],
      };
    case ARRANGE_RAW_ALL:
      // console.log(action.data);
      return {
        ...state,
        singleDocRawAll: action.data,
      };
    case ARRANGE_TABLE_DATA:
      // console.log(action.data);
      return {
        ...state,
        singleDocumentTextractedTables: action.data[0],
        singleDocumentEditedTables: action.data[1],
      };
    case ARRANGE_TABLES_ALL:
      // console.log(action.data);
      return {
        ...state,
        singleDocTablesAll: action.data,
      };
    case EDIT_KEYS_VALUES_RAW_DATA:
      // console.log(action.data);
      return {
        ...state,
      };
    case EDIT_TABLE_DATA:
      // console.log(action.data);
      return {
        ...state,
      };
    case SAVE_EDITED_KEYS_VALUES_RAW_DATA:
      // console.log(action.data);
      return {
        ...state,
      };
    case SAVE_EDITED_TABLE_DATA:
      // console.log(action.data);
      return {
        ...state,
      };
    case DROPDOWN_SELECTED:
      // console.log(action.data);
      return {
        ...state,
        dropdownSelected: action.data,
      };
    case UPDATE_TEMPLATE_DETAILS:
      // console.log(action.data);
      return {
        ...state,
        templateDetails: action.data,
      };
    case SAVE_SUBTEMP_TEMPLATE_DETAILS:
      // console.log(action.data);
      return {
        ...state,
        saveSubTempDetails: action.data,
      };
    // case SAVE_BLOB_EXCEL_DETAILS:
    //   // console.log(action.data);
    //   return {
    //     ...state,
    //     blobExcelDetails: action.data,
    //   };

    default:
      return state;
  }
}
