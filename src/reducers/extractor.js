import {
  CHANGE_TAB_OPERATION,
  CHANGE_TEXT_DATA_TAB_OPERATION,
  HANDLE_FILE_CHANGE,
  HANDLE_PROCESSED_FILE_TAB_CHANGE,
  USER_EDITED_KVRT_LIST,
  CLEAR_EDITED_KVRT_LIST,
  SET_CONF_REMOTE_STORAGE,
  SET_ALL_SFTP_DETAILS,
  SET_ALL_AZURE_DETAILS,
  SET_ALL_AWS_DETAILS,
  SET_BULK_UPLOAD_PAGE,
  SET_ALL_SFTP_FOLDERS_AND_MAPPINGS,
  SET_ALL_AZURE_FOLDERS_AND_MAPPINGS,
  SET_ALL_AWS_FOLDERS_AND_MAPPINGS,
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

  confRemoteStorage: 1,

  // --------------  SFTP  ----------------
  bulkUploadPage: {
    page: 1,
    data: {},
  },
  allSftpDetails: [
    // {
    //   SftpName: 'SftpName',
    //   SftpUrl: 'SftpUrl',
    //   hostname: 'hostname',
    //   username: 'username',
    //   status: 'Successful', // 'Not Successful', // 'In Progress'
    // },
    // {
    //   SftpName: 'SftpName',
    //   SftpUrl: 'SftpUrl',
    //   hostname: 'hostname',
    //   username: 'username',
    //   status: 'Successful', // 'Not Successful', // 'In Progress'
    // },
  ],
  allAzureDetails: [
    // {
    //   connection_name: 'DEMO_AZURE2',
    //   connection_type: 'AZURE',
    //   status: 'Successful',
    // },
    // {
    //   connection_name: 'DEMO_AZURE3',
    //   connection_type: 'AZURE',
    //   status: 'Successful',
    // },
  ],

  allAWSDetails: [
    // {
    //   connection_name: 'DEMO_AZURE2',
    //   connection_type: 'AZURE',
    //   status: 'Successful',
    // },
    // {
    //   connection_name: 'DEMO_AZURE3',
    //   connection_type: 'AZURE',
    //   status: 'Successful',
    // },
  ],

  allSFTPFoldersAndMappings: {
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
  allAzureFoldersAndMappings: {
    connection_name: '',
    connection_type: '',
    mapped_folders: [
      // {
      //   folder_name: 'wartsila/',
      //   template_name: 'test',
      //   status: 'Successful',
      // },
    ],
    container_list: [
      // 'cychatsamplefiles',
      // 'documentdetails',
      // 'embeddings',
      // 'formrecognizer',
      // 'input',
      // 'masterdata',
      // 'staging-container',
      // 'template-download',
      // 'testing',
      // 'vscode',
      // 'z-output',
    ],
  },
  allAWSFoldersAndMappings: {
    connection_name: '',
    connection_type: '',
    mapped_folders: [
      // {
      //   folder_name: 'wartsila/',
      //   template_name: 'test',
      //   status: 'Successful',
      // },
    ],
    aws_s3_folders: [
      // 'cychatsamplefiles',
      // 'documentdetails',
      // 'embeddings',
      // 'formrecognizer',
      // 'input',
      // 'masterdata',
      // 'staging-container',
      // 'template-download',
      // 'testing',
      // 'vscode',
      // 'z-output',
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
    case SET_CONF_REMOTE_STORAGE:
      // console.log(action.data);
      return {
        ...state,
        confRemoteStorage: action.data,
      };
    case SET_ALL_SFTP_DETAILS:
      // console.log(action.data);
      return {
        ...state,
        allSftpDetails: action.data,
      };
    case SET_ALL_AZURE_DETAILS:
      // console.log(action.data);
      return {
        ...state,
        allAzureDetails: action.data,
      };
    case SET_ALL_AWS_DETAILS:
      // console.log(action.data);
      return {
        ...state,
        allAWSDetails: action.data,
      };
    case SET_BULK_UPLOAD_PAGE:
      // console.log(action.data);
      return {
        ...state,
        bulkUploadPage: action.data,
      };
    case SET_ALL_SFTP_FOLDERS_AND_MAPPINGS:
      // console.log(action.data);
      return {
        ...state,
        allSFTPFoldersAndMappings: action.data,
      };
    case SET_ALL_AZURE_FOLDERS_AND_MAPPINGS:
      // console.log(action.data);
      return {
        ...state,
        allAzureFoldersAndMappings: action.data,
      };
    case SET_ALL_AWS_FOLDERS_AND_MAPPINGS:
      // console.log(action.data);
      return {
        ...state,
        allAWSFoldersAndMappings: action.data,
      };
    default:
      return state;
  }
}
