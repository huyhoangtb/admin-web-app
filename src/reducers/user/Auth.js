/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */

import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  ACTIVE_LOGIN_TAB_ACTION,
  LOGIN_SUCCESS_ACTION,
  OPEN_LOGIN_DIALOG,
  CLOSE_LOGIN_DIALOG,
  ACTIVE_REGISTER_TAB_ACTION
} from "components/user/auth/actions";

const userInitialState = {
  isLoginTabActivated: true,
  openLoginDialog: false,
  info: {}
};

export const User = (state = userInitialState, action) => {
  let newState = {};
  switch (action.type) {

    case ACTIVE_LOGIN_TAB_ACTION:
      newState = {
        ...state,
        isLoginTabActivated: true
      }
      break;

    case LOGIN_ACTION:
      newState = {
        ...state,
        isLoginTabActivated: true
      }
      break;

    case LOGIN_SUCCESS_ACTION:
      newState = {
        ...state,
        info: action.userInfo
      }
      break;

    case LOGOUT_ACTION:

      newState = {
        ...state,
        isLoginTabActivated: true
      }
      break;

    case ACTIVE_REGISTER_TAB_ACTION:
      newState = {
        ...state,
        isLoginTabActivated: false
      }
      break;
    case OPEN_LOGIN_DIALOG:
      newState = {
        ...state,
        openLoginDialog: action.openLoginDialog
      }
      break;
    case CLOSE_LOGIN_DIALOG:
      newState = {
        ...state,
        openLoginDialog: action.openLoginDialog
      }
      break;
    default:
      return state;

  }
  return newState
};