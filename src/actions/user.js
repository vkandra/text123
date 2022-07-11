// ACTION TYPES
export const SIGN_OUT_OPERATION = 'SIGN_OUT_OPERATION';
export const SIGN_IN_OPERATION = 'SIGN_IN_OPERATION';
export const SIGN_UP_OPERATION = 'SIGN_UP_OPERATION';

// ACTION CREATORS
export function signOutOperation(data) {
  return {
    type: SIGN_OUT_OPERATION,
    data: data,
  };
}
export function signInOperation(data) {
  return {
    type: SIGN_IN_OPERATION,
    data: data,
  };
}
export function signUpOperation(data) {
  return {
    type: SIGN_UP_OPERATION,
    data: data,
  };
}
