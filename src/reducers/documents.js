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
    template_id: '',
    all_excel_keys: [],
    all_cytext_keys: [],
  },
  templateMapRuleData_1_delete_this: {
    user_id: 'AV123',
    filename: 'Health Policy.pdf',
    fileid: '0x8DBB45D4A7040A3',
    templatename: 'unibo',
    template_id: 'unibo995058',
    all_excel_keys: [
      {
        uniq_id: '2b0e3932-fd82-4051-9552-0bb7e6372015',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: '3jeUjv',
        excel_key: 'Column 1',
        map_cytext_key: 'GHI',
        map_cytext_value: 'VALUE_NOT_FOUND',
        map_cytext_key_page: 4,
        map_cytext_key_repeat: 0,
        prompt: '',
        selection: 'map',
        prompt_output: '',
      },
      {
        uniq_id: 'cdddba56-bbce-45c5-a78a-b3f082b25bb7',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'jeWbqB',
        excel_key: 'Column 2',
        map_cytext_key: 'NAME',
        map_cytext_value: 'RAWNAK CHOURASIA\nCYIENT LIMITED',
        map_cytext_key_page: 1,
        map_cytext_key_repeat: 0,
        prompt: '',
        selection: 'map',
        prompt_output: '',
      },
      {
        uniq_id: '90cc9f25-a825-4de8-9056-7156eddf26b2',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: '0L7vC3',
        excel_key: 'Column 3',
        map_cytext_key: 'NAME',
        map_cytext_value: 'RAWNAK CHOURASIA\nCYIENT LIMITED',
        map_cytext_key_page: 1,
        map_cytext_key_repeat: 0,
        prompt: '',
        selection: 'map',
        prompt_output: '',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
      {
        uniq_id: '6bfe5f25-41ad-4fa1-920d-e3945daa8921',
        userid: 'AV123',
        templatename: 'unibo',
        templateid: 'unibo995058',
        rule_id: 'BtQrl2',
        excel_key: 'Column 4 ',
        map_cytext_key: '',
        map_cytext_value: '',
        map_cytext_key_page: '',
        map_cytext_key_repeat: '',
        prompt: 'What is the Name?',
        selection: 'prompt',
        prompt_output:
          'The given portion of the document does not provide any information about the specific name being referred to.',
      },
    ],
    all_cytext_keys: [
      {
        cytext_key: 'NAME',
        cytext_value: 'RAWNAK CHOURASIA\nCYIENT LIMITED',
        page_no: 1,
        repeat_no: 0,
        map_status: 'unused',
      },
      {
        cytext_key: 'EMPLOYEE ID',
        cytext_value: '60589\n10/05/2023',
        page_no: 2,
        repeat_no: 0,
        map_status: 'unused',
      },
      {
        cytext_key: 'GHI',
        cytext_value: 'SELECTED',
        page_no: 3,
        repeat_no: 0,
        map_status: 'unused',
      },
      {
        cytext_key: 'GHI',
        cytext_value: 'VALUE_NOT_FOUND',
        page_no: 4,
        repeat_no: 0,
        map_status: 'unused',
      },
      {
        cytext_key: 'Parental',
        cytext_value: 'SELECTED',
        page_no: 5,
        repeat_no: 0,
        map_status: 'unused',
      },
      {
        cytext_key:
          'Total Employee Payable Amount of ₹ 10,771/- will be deducted from your salary in 3 equal installments',
        cytext_value: 'SELECTED',
        page_no: 6,
        repeat_no: 0,
        map_status: 'unused',
      },
    ],
  },
  templateMapRuleLoad: false,

  // Template Insights
  templateInsights: {
    template_name: 'cde',
    template_id: 111,
    cust_name: 'ppp',
    dept_name: 'lpl',
    proj_name: 'hdh',
    total_processed_files: 2,
    file_details: [
      {
        file_name: 'aaa.pdf',
        file_id: 'p1p2',
        file_upload: '2023-08-13',
        file_processed: '2023-09-14',
        file_size: '1024',
        file_review_status: 'Reviewed',
        file_url: 'https://www....com',
      },
      {
        file_name: 'bbb.pdf',
        file_id: 'p1p244',
        file_upload: '2023-04-13',
        file_processed: '2023-05-14',
        file_size: '1424',
        file_review_status: 'Not Reviewed',
        file_url: 'https://www....com',
      },
    ],
  },
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

    default:
      return state;
  }
}
