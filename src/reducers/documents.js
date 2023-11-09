import {
  ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA,
  SELECT_DOCUMENTS_CONFIGURATION,
  UNSELECT_DOCUMENTS_CONFIGURATION,
  ASSIGN_RAW_DOCUMENTS_DATA,
  CLEAR_SELECTED_FILES,
  ASSIGN_DASHBOARD_DATA,
  UPDATE_TEMPLATE_NAMES,
  UPDATE_SUBTEMPLATE_NAMES,
  SORT_BY_DATA,
  SEARCH_BY_DATA,
  SET_TEMPLATE_MAP_RULE_LOAD,
  SET_TEMPLATES_MAP_RULES_DATA,
  SET_TEMPLATE_RULE_DATA,
  SET_TEMPLATE_INSIGHTS_DATA,
  SET_INSIGHTS_SECOND_PAGE,
  SET_INSIGHTS_SINGLE_FILE_DATA,
  SET_ALL_CUSTOMERS,
  SET_SINGLE_CUSTOMER_EXCEL_FILES,
} from '../actions/documents';

const initialDocumentsState = {
  totalDocuments: 0,
  documentDetails: [
    {
      documentId: 0,
      documentType: '',
      ducumentName: '',
      documentUploadDate: '',
      documentSize: 0,
      documentPages: 0,
      documentStatus: '',
      documentDownloadLink: '',
      step_fun_execution_id: '',
      processed_date: '',
      template_name: '',
      sub_template_name: '',
    },
  ],
  filteredFilelistNotProcessed: [],
  filteredFilelistProcessed: [],
  selectedDocuments: [],

  // SORT
  sortByDataElements: ['Name', true],

  // SEARCH
  searchProcessedParam: [],
  searchProcessed: [],
  searchNotProcessedParam: [],
  searchNotProcessed: [],

  // Dashboard Data
  processedFileList: [],
  processedFileListSize: 0,
  unprocessedFileListSize: 0,
  notProcessedFileListSize: 0,
  processingFileListSize: 0,
  chart1data: {
    labels: [],
    datasets: [
      {
        label: 'Documents Processed - Day Wise',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  },
  // templateNames: ['Receipt', 'Bill', 'Other'],
  templateNames: [],
  subTemplateNames: [],
  chart2data: {
    labels: [],
    datasets: [
      {
        label: 'Documents Processed - Template Wise',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  },

  //
  rawDocumentsDataFromAPI: {},

  //TEMPLATES MAP RULES
  templateMapRule: {
    overlay: false,
    templateName: '',
    templateId: '',
    totalFiles: 0,
    referenceFile: 'Not Set',
    excelUploaded: false,
    totalFields: 0,
    totalFieldsMapped: 0,
    totalFieldsRules: 0,
  },
  templateMapRuleData: {
    user_id: '',
    filename: '',
    fileid: '',
    templatename: '',
    fileurl: '',
    template_id: '',
    all_excel_keys: [],
    all_cytext_keys: [],
  },
  templateMapRuleLoad: false,

  // Template Insights
  templateInsights: {
    template_name: '',
    template_id: -1,
    cust_name: '',
    dept_name: '',
    proj_name: '',
    total_processed_files: 0,
    file_details: [],
  },

  insightsSecondPage: {
    display: false,
    file_name: '',
    template_name: '',
    file_url: '',
  },
  insight2ndPageFileDetail: {
    template_name: '',
    template_id: -1,
    file_name: '',
    file_id: '',
    file_url: '',
    file_data: [],
  },

  // Customer Configuration
  allCustomers: [
    {
      customer_id: 'SNP123',
      customer_name: 'SNP',
    },
    {
      customer_id: 'sep2334',
      customer_name: 'sep23',
    },
    {
      customer_id: 'hmhydro123',
      customer_name: 'hmhydro',
    },
    {
      customer_id: 'SSEN123',
      customer_name: 'SSEN',
    },
  ],
  singleCustomerExcelFiles: [
    {
      name: 'cus1_huf455/CEC2.ipynb',
      url: 'https://texextraction.blob.core.windows.net/masterdata/cus1_huf455/CEC2.ipynb',
      size: 14301,
      content_type: 'application/octet-stream',
      last_modified: '2023-11-08T17:27:02+00:00',
    },
    {
      name: 'cus1_huf455/Masterdataupload.ipynb',
      url: 'https://texextraction.blob.core.windows.net/masterdata/cus1_huf455/Masterdataupload.ipynb',
      size: 5567,
      content_type: 'application/octet-stream',
      last_modified: '2023-11-08T17:26:30+00:00',
    },
  ],
};

export default function documents(state = initialDocumentsState, action) {
  switch (action.type) {
    case ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        totalDocuments: action.data.totalDocuments,
        documentDetails: action.data.documentDetails,
        filteredFilelistProcessed: action.data.processedFileList,
        filteredFilelistNotProcessed: action.data.notProcessedFileList,
      };
    case SELECT_DOCUMENTS_CONFIGURATION:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
      };
    case UNSELECT_DOCUMENTS_CONFIGURATION:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
      };
    case ASSIGN_RAW_DOCUMENTS_DATA:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        rawDocumentsDataFromAPI: action.data,
      };
    case CLEAR_SELECTED_FILES:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        selectedDocuments: [],
      };
    case ASSIGN_DASHBOARD_DATA:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
      };
    case UPDATE_TEMPLATE_NAMES:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        templateNames: action.data,
      };
    case UPDATE_SUBTEMPLATE_NAMES:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        subTemplateNames: action.data,
      };
    case SORT_BY_DATA:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        // documentDetails: action.data,
      };
    case SEARCH_BY_DATA:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        // documentDetails: action.data,
      };
    case SET_TEMPLATE_RULE_DATA:
      console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        templateMapRuleData: action.data,
      };
    case SET_TEMPLATES_MAP_RULES_DATA:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        // documentDetails: action.data,
      };

    case SET_TEMPLATE_MAP_RULE_LOAD:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        templateMapRuleLoad: action.data,
      };
    case SET_TEMPLATE_INSIGHTS_DATA:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        templateInsights: action.data,
      };
    case SET_INSIGHTS_SECOND_PAGE:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        insightsSecondPage: action.data,
      };
    case SET_INSIGHTS_SINGLE_FILE_DATA:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        insight2ndPageFileDetail: action.data,
      };
    case SET_ALL_CUSTOMERS:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        allCustomers: action.data,
      };
    case SET_SINGLE_CUSTOMER_EXCEL_FILES:
      // console.log('ACTION_in_reducer ', action.data);
      return {
        ...state,
        singleCustomerExcelFiles: action.data,
      };
    default:
      return state;
  }
}
