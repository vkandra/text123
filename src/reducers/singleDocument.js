import {
  ASSIGN_SINGLE_FILE_DATA,
  ARRANGE_KEYS_DATA,
  ARRANGE_VALUES_DATA,
  ARRANGE_RAW_DATA,
  ARRANGE_TABLE_DATA,
} from '../actions/singleDocument';

const initialsingleDocumentState = {
  singleDocumentId: 0,
  singleDocumentName: '',
  singleDocumentType: '',
  singleDocumentTotalPages: 0,
  // ALL CONTENT
  singleDocumentTextractedContent: [],
  singleDocumentEditedContent: [],
  // KEYS
  singleDocumentTextractedKey: [],
  singleDocumentEditedKey: [],
  // VALUES
  singleDocumentTextractedValue: [],
  singleDocumentEditedValue: [],
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
    case ASSIGN_SINGLE_FILE_DATA:
      // console.log(action.data);
      return {
        ...state,
        singleDocumentTextractedContent: action.data.Textracted_output,
        singleDocumentEditedContent: action.data.Edited_output,
      };
    case ARRANGE_KEYS_DATA:
      // console.log(action.data);
      return {
        ...state,
      };
    case ARRANGE_VALUES_DATA:
      // console.log(action.data);
      return {
        ...state,
      };
    case ARRANGE_RAW_DATA:
      // console.log(action.data);
      return {
        ...state,
      };
    case ARRANGE_TABLE_DATA:
      // console.log(action.data);
      return {
        ...state,
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
