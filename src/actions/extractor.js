// ACTION TYPES
export const CHANGE_TAB_OPERATION = 'CHANGE_TAB_OPERATION';
export const CHANGE_TEXT_DATA_TAB_OPERATION = 'CHANGE_TEXT_DATA_TAB_OPERATION';

// ACTION CREATORS
export function changeTabOperation(data) {
  return {
    type: CHANGE_TAB_OPERATION,
    data: data,
  };
}

export function changeTextDataTabOperation(data) {
  return {
    type: CHANGE_TEXT_DATA_TAB_OPERATION,
    data: data,
  };
}
