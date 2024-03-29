import axios from 'axios';
import { updateSubTemplateNames } from './documents';

// ACTION TYPES
export const SINGLE_DOC_DETAIL = 'SINGLE_DOC_DETAIL';
export const ASSIGN_SELECTED_DOC_DETAILS = 'ASSIGN_SELECTED_DOC_DETAILS';
export const ASSIGN_SINGLE_FILE_DATA = 'ASSIGN_SINGLE_FILE_DATA';
export const ARRANGE_KEYS_DATA = 'ARRANGE_KEYS_DATA';
export const ARRANGE_VALUES_DATA = 'ARRANGE_VALUES_DATA';
export const ARRANGE_KEYS_VALUES = 'ARRANGE_KEYS_VALUES';
export const ARRANGE_RAW_DATA = 'ARRANGE_RAW_DATA';
export const ARRANGE_TABLE_DATA = 'ARRANGE_TABLE_DATA';
export const ARRANGE_TABLES_ALL = 'ARRANGE_TABLES_ALL';
export const EDIT_KEYS_VALUES_RAW_DATA = 'EDIT_KEYS_VALUES_RAW_DATA';
export const ARRANGE_RAW_ALL = 'ARRANGE_RAW_ALL';
export const EDIT_TABLE_DATA = 'EDIT_TABLE_DATA';
export const SAVE_EDITED_KEYS_VALUES_RAW_DATA =
  'SAVE_EDITED_KEYS_VALUES_RAW_DATA';
export const SAVE_EDITED_TABLE_DATA = 'SAVE_EDITED_TABLE_DATA';
export const DROPDOWN_SELECTED = 'DROPDOWN_SELECTED';
export const UPDATE_TEMPLATE_DETAILS = 'UPDATE_TEMPLATE_DETAILS';
export const SAVE_SUBTEMP_TEMPLATE_DETAILS = 'SAVE_SUBTEMP_TEMPLATE_DETAILS';

// ACTION CREATORS

export function singleDocDetail(data) {
  // console.log(data);
  return {
    type: SINGLE_DOC_DETAIL,
    data: data,
  };
}

export function assignSelectedDocDetails(data) {
  // console.log(data);
  return {
    type: ASSIGN_SELECTED_DOC_DETAILS,
    data: data,
  };
}
export function assignSingleFileData(data) {
  // console.log(data);
  return {
    type: ASSIGN_SINGLE_FILE_DATA,
    data: data,
  };
}

export function arrangeKeysData(data) {
  // console.log(data);
  return {
    type: ARRANGE_KEYS_DATA,
    data: data,
  };
}

export function arrangeValuesData(data) {
  // console.log(data);
  return {
    type: ARRANGE_VALUES_DATA,
    data: data,
  };
}

export function arrangeKeysValues(data) {
  // console.log(data);
  return {
    type: ARRANGE_KEYS_VALUES,
    data: data,
  };
}

export function arrangeRawAll(data) {
  // console.log(data);
  return {
    type: ARRANGE_RAW_ALL,
    data: data,
  };
}

export function arrangeRawData(data) {
  // console.log(data);
  return {
    type: ARRANGE_RAW_DATA,
    data: data,
  };
}

export function arrangeTableData(data) {
  // console.log(data);
  return {
    type: ARRANGE_TABLE_DATA,
    data: data,
  };
}

export function arrangeTablesAll(data) {
  // console.log(data);
  return {
    type: ARRANGE_TABLES_ALL,
    data: data,
  };
}

export function editKeysValuesRawData(data) {
  // console.log(data);
  return {
    type: EDIT_KEYS_VALUES_RAW_DATA,
    data: data,
  };
}

export function editTableData(data) {
  // console.log(data);
  return {
    type: EDIT_TABLE_DATA,
    data: data,
  };
}

export function saveEditedKeysValuesRawData(data) {
  // console.log(data);
  return {
    type: SAVE_EDITED_KEYS_VALUES_RAW_DATA,
    data: data,
  };
}

export function saveEditedTableData(data) {
  // console.log(data);
  return {
    type: SAVE_EDITED_TABLE_DATA,
    data: data,
  };
}

export function dropdownSelected(data) {
  // console.log(data);
  return {
    type: DROPDOWN_SELECTED,
    data: data,
  };
}

export function updateTemplateDetails(data) {
  // console.log(data);
  return {
    type: UPDATE_TEMPLATE_DETAILS,
    data: data,
  };
}
export function saveSubtempDetails(data) {
  // console.log(data);
  return {
    type: SAVE_SUBTEMP_TEMPLATE_DETAILS,
    data: data,
  };
}

// API Calls

export function fetchSingleFileDataAPI(data) {
  console.log(data);
  return (dispatch) => {
    axios
      .get(
        // `https://4xjuok1l6c.execute-api.ap-south-1.amazonaws.com/output?user_id=${data[0]}&job_id=${data[1]}&template_id=${data[3]}`
        `https://functionstexextraction.azurewebsites.net/api/TextExtraction/outputapi?user_id=${data[0]}&job_id=${data[1]}&template_id=Others}`
      )
      .then((res) => {
        console.log(res.data);
        dispatch(assignSingleFileData(res.data));
        dispatch(arrangeKeysData(res.data));
        dispatch(arrangeValuesData(res.data));
        dispatch(arrangeKeysValues([res.data, data[2], data[3], data[4]]));
        dispatch(arrangeRawData(res.data));
        dispatch(arrangeTableData(res.data));
        dispatch(arrangeRawAll(res.data));
        dispatch(arrangeTablesAll(res.data));
        // console.log(assignSingleFileData(res.data));

        // dispatch(clearEditedKVRTList());
      });
  };
}

export function fetchTemplateDataAPI(data) {
  return (dispatch) => {
    axios
      .post(
        // `https://lkv9swpfm7.execute-api.ap-south-1.amazonaws.com/fvrt`,
        `https://functionstexextraction.azurewebsites.net/api/TextExtraction/fetchtemplateDataAPI`,
        data
      )
      .then((res) => {
        console.log('Template Data -> ', res.data);
        dispatch(updateTemplateDetails(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function addDeletefetchTemplateAPI(data) {
  if (data.action === 'add') {
    return (dispatch) => {
      axios
        .post(
          `https://functionstexextraction.azurewebsites.net/api/AddTemplateAPI`,
          data
        )
        .then((res) => {
          console.log('Response -> ', res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }
  if (data.action === 'fetch') {
    return (dispatch) => {
      axios
        .post(
          // `https://2wehobnzu6.execute-api.ap-south-1.amazonaws.com/add_delete`,
          `https://functionstexextraction.azurewebsites.net/api/TextExtraction/fetchsubtemplateAPI`,
          data
        )
        .then((res) => {
          console.log('Response -> ', res.data);
          // dispatch(updateTemplateDetails(res.data));

          // if (data.action === 'fetch') {
          console.log(res.data);
          let sub_templateNames = [];
          for (let i = 0; i < res.data.length; i++) {
            sub_templateNames.push(res.data[i].sub_template_name);
          }
          dispatch(updateSubTemplateNames(sub_templateNames));
          dispatch(saveSubtempDetails(res.data));
          // }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }
}
