import {
  CHANGE_TAB_OPERATION,
  CHANGE_TEXT_DATA_TAB_OPERATION,
  HANDLE_FILE_CHANGE,
  HANDLE_PROCESSED_FILE_TAB_CHANGE,
  USER_EDITED_KVRT_LIST,
  CLEAR_EDITED_KVRT_LIST,
  SET_ALL_SFTP_DETAILS,
  SET_BULK_UPLOAD_PAGE,
  SET_ALL_FOLDERS_AND_MAPPINGS,
} from '../actions/extractor';

const extractorDocumentState = {
  selectedFileForUpload: {},
  page: 1,
  textDataTab: 1,
  // 1 is for Not Processed and 2 is for Processed
  processedFileTab: 1,
  // ALL THE EDITS MADE BY USER DURING SESSION
  userEditedKeyValueRawTable: [],
  // userEditedTable: [],

  // --------------  SFTP  ----------------
  bulkUploadPage: {
    page: 1,
    data: {},
  },
  allSftpDetails: [],

  allFoldersAndMappings: {
    all_folders: [],
    all_files: [],
    user_id: '',
    SftpName: '',
    SftpUrl: '',
    hostname: '',
    username: '',
    mapped_folders: [
      // {
      //   folder_name: 'root',
      //   template_name: 'ABC',
      //   status: 'Successful', // 'Not Successful', // 'In Progress'
      // },
      // {
      //   folder_name: 'root',
      //   template_name: 'ABC',
      //   status: 'Not Successful', // 'Not Successful', // 'In Progress'
      // },
      // {
      //   folder_name: 'root',
      //   template_name: 'ABC',
      //   status: 'In Progress', // 'Not Successful', // 'In Progress'
      // },
    ],
  },
};

export default function extractor(state = extractorDocumentState, action) {
  switch (action.type) {
    case CHANGE_TAB_OPERATION:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case CHANGE_TEXT_DATA_TAB_OPERATION:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case HANDLE_FILE_CHANGE:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case HANDLE_PROCESSED_FILE_TAB_CHANGE:
      // console.log('ACTION_in_reducer ', action);
      return {
        ...state,
      };
    case USER_EDITED_KVRT_LIST:
      // console.log(action.data);
      // extractorDocumentState.userEditedKeyValueRawTable.push(action.data);
      return {
        ...state,
        userEditedKeyValueRawTable: [
          ...state.userEditedKeyValueRawTable,
          action.data,
        ],
      };
    case CLEAR_EDITED_KVRT_LIST:
      // console.log(action.data);
      return {
        ...state,
        userEditedKeyValueRawTable: action.data,
      };
    case SET_ALL_SFTP_DETAILS:
      // console.log(action.data);
      return {
        ...state,
        allSftpDetails: action.data,
      };
    case SET_BULK_UPLOAD_PAGE:
      // console.log(action.data);
      return {
        ...state,
        bulkUploadPage: action.data,
      };
    case SET_ALL_FOLDERS_AND_MAPPINGS:
      // console.log(action.data);
      return {
        ...state,
        allFoldersAndMappings: action.data,
      };
    default:
      return state;
  }
}
