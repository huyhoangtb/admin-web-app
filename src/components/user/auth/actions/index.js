/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION';
export const ACTIVE_LOGIN_TAB_ACTION = 'ACTIVE_LOGIN_TAB_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const OPEN_LOGIN_DIALOG = 'OPEN_LOGIN_DIALOG';
export const CLOSE_LOGIN_DIALOG = 'CLOSE_LOGIN_DIALOG';
export const ACTIVE_REGISTER_TAB_ACTION = 'ACTIVE_REGISTER_TAB_ACTION';

export function login(username, password, remember) {
  return {type: LOGIN_ACTION, username, password, remember}
}

export function activeLoginTab() {
  return {type: ACTIVE_LOGIN_TAB_ACTION}
}

export function loginSuccess(userInfo) {
  return {type: LOGIN_SUCCESS_ACTION, userInfo}
}

export function logout(redirectUrl) {
  return {type: LOGOUT_ACTION, redirectUrl}
}

export function openLoginDialog() {
  return {type: OPEN_LOGIN_DIALOG, openLoginDialog: true}
}

export function closeLoginDialog() {
  return {type: OPEN_LOGIN_DIALOG, openLoginDialog: false}
}

export function activeRegisterTab() {
  return {type: ACTIVE_REGISTER_TAB_ACTION}
}
