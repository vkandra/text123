import {
  ASSIGN_SINGLE_FILE_DATA,
  ARRANGE_KEYS_DATA,
  ARRANGE_VALUES_DATA,
  ARRANGE_KEYS_VALUES,
  ARRANGE_RAW_DATA,
  ARRANGE_TABLE_DATA,
  ASSIGN_SELECTED_DOC_DETAILS,
} from '../actions/singleDocument';

const initialsingleDocumentState = {
  singleDocumentId: 0,
  singleDocumentName: '',
  singleDocumentType: '',
  singleDocumentTotalPages: 0,
  selectedDocumentsDetails: [],
  // ALL CONTENT
  singleDocumentTextractedContent: [],
  singleDocumentEditedContent: [],
  // KEYS
  singleDocumentTextractedKey: [],
  singleDocumentEditedKey: [],
  // VALUES
  singleDocumentTextractedValue: [],
  singleDocumentEditedValue: [],
  // KEYS VALUES
  singleDocKeysValues: [],
  // TABLES
  singleDocumentTextractedTables: [],
  singleDocumentEditedTables: [],
  // RAW DATA
  singleDocumentTextractedRawData: [],
  singleDocumentEditedRawData: [],
};

export default function singleDocument(
  state = initialsingleDocumentState,
  action
) {
  switch (action.type) {
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
        singleDocKeysValues: action.data,
      };
    case ARRANGE_RAW_DATA:
      // console.log(action.data);
      return {
        ...state,
        singleDocumentTextractedRawData: action.data[0],
        singleDocumentEditedRawData: action.data[1],
      };
    case ARRANGE_TABLE_DATA:
      // console.log(action.data);
      return {
        ...state,
        singleDocumentTextractedTables: action.data[0],
        singleDocumentEditedTables: action.data[1],
      };
    default:
      return state;
  }
}

/*
const abc = {
	user_id: 'slaolsoakla98skalk',
  document_id: 'la9lao8ala87sy',
	keys_extracted_data: [
		{
			index: 0,
      value: 'abc',
    },
    {
      index: 1,
      value: 'def',
    },
    {
      index: 2,
      value: 'ghi',
    },
    {
      index: 3,
      value: 'jkl',
    },
  ],
  values_extracted_data: [
    {
			index: 0,
      value: 'abc',
    },
    {
      index: 1,
      value: 'def',
    },
    {
      index: 2,
      value: 'ghi',
    },
    {
      index: 3,
      value: 'jkl',
    },
  ],
  text_extracted_data_total_pages: 4,
  text_extracted_data_page_content: [
    [
      {
        index: 0,
        value: 'abc',
      },
      {
        index: 1,
        value: 'def',
      },
      {
        index: 2,
        value: 'ghi',
      },
      {
        index: 3,
        value: 'jkl',
      },
    ],
    [
      {
        index: 0,
        value: 'abc',
      },
      {
        index: 1,
        value: 'def',
      },
      {
        index: 2,
        value: 'ghi',
      },
      {
        index: 3,
        value: 'jkl',
      },
    ],
    [
      {
        index: 0,
        value: 'abc',
      },
      {
        index: 1,
        value: 'def',
      },
      {
        index: 2,
        value: 'ghi',
      },
      {
        index: 3,
        value: 'jkl',
      },
    ],
    [
      {
        index: 0,
        value: 'abc',
      },
      {
        index: 1,
        value: 'def',
      },
      {
        index: 2,
        value: 'ghi',
      },
      {
        index: 3,
        value: 'jkl',
      },
    ],
  ],
  table_extracted_data_total: 2,
  table_extracted_data_headers: [
    ['index', 'Times', 'In', 'out'],
    ['index', 'in', 'out'],
  ],
  table_extracted_data_body: [
    [
      ["abc", "def", "ghi", "jkl"],
      ["mon", "tue", "wed", "thu"],
      ["jan", "feb", "mar", "apr"]
    ],
    [
      [
        "2021", "2022", "2023",
      ],
      [
        'lao', "kjd", "lspo"
      ],
      [
        "mcn", "axn", "hbo",
      ],
      [
        "mlp", "", ""
      ]
    ],
  ],

  keys_edited_data: [
		{
			index: 0,
      value: 'abc',
    },
    {
      index: 1,
      value: 'def',
    },
    {
      index: 2,
      value: 'ghi',
    },
    {
      index: 3,
      value: 'jkl',
    },
  ],
  values_edited_data: [
    {
			index: 0,
      value: 'abc',
    },
    {
      index: 1,
      value: 'def',
    },
    {
      index: 2,
      value: 'ghi',
    },
    {
      index: 3,
      value: 'jkl',
    },
  ],
  text_edited_data_total_pages: 4,
  text_edited_data_page_content: [
    [
      {
        index: 0,
        value: 'abc',
      },
      {
        index: 1,
        value: 'def',
      },
      {
        index: 2,
        value: 'ghi',
      },
      {
        index: 3,
        value: 'jkl',
      },
    ],
    [
      {
        index: 0,
        value: 'abc',
      },
      {
        index: 1,
        value: 'def',
      },
      {
        index: 2,
        value: 'ghi',
      },
      {
        index: 3,
        value: 'jkl',
      },
    ],
    [
      {
        index: 0,
        value: 'abc',
      },
      {
        index: 1,
        value: 'def',
      },
      {
        index: 2,
        value: 'ghi',
      },
      {
        index: 3,
        value: 'jkl',
      },
    ],
    [
      {
        index: 0,
        value: 'abc',
      },
      {
        index: 1,
        value: 'def',
      },
      {
        index: 2,
        value: 'ghi',
      },
      {
        index: 3,
        value: 'jkl',
      },
    ],
  ],
  table_edited_data_total: 2,
  table_edited_data_headers: [
    ['index', 'Times', 'In', 'out'],
    ['index', 'in', 'out'],
  ],
  table_edited_data_body: [
    [
      [
        "abc", "def", "ghi", "jkl",
      ],
      [
        "mon", "tue", "wed", "thu",
      ],
      [
        "jan", "feb", "mar", "apr",
      ]
    ],
    [
      [
        "2021", "2022", "2023",
      ],
      [
        'lao', "kjd", "lspo"
      ],
      [
        "mcn", "axn", "hbo",
      ],
      [
        "mlp", "", ""
      ]
    ],
  ],

}
*/
