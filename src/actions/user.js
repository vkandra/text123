// ACTION TYPES
export const SIGN_IN_OPERATION = 'SIGN_IN_OPERATION';
export const SIGN_UP_OPERATION = 'SIGN_UP_OPERATION';
export const FORGOT_PASSWORD_CLICKED = 'FORGOT_PASSWORD_CLICKED';
export const PASS_SENT_TO_EMAIL = 'PASS_SENT_TO_EMAIL';

// ACTION CREATORS
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
export function forgotPasswordClicked(data) {
  return {
    type: FORGOT_PASSWORD_CLICKED,
    data: data,
  };
}
export function passSentToEmail(data) {
  return {
    type: PASS_SENT_TO_EMAIL,
    data: data,
  };
}
