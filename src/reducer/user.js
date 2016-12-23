'use strict';
import { combineReducers } from 'redux';

import {
  USER_LIST_REQUERY,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_EDIT_REQUERY,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAILURE,
  USER_DELETE_REQUERY,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_LOGIN_REQUERY,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from "../actions/user.js";

const list = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case USER_LIST_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case USER_LIST_FAILURE:
      return {
        ...state,
        completed: false,
      }
    default:
      return state;
  }
}

const edit = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case USER_EDIT_FAILURE:
      return {
        ...state,
        completed: false,
      }
    default:
      return state;
  }
}

const remove = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case USER_DELETE_FAILURE:
      return {
        ...state,
        completed: false,
      }
    default:
      return state;
  }
}
const login = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        completed: false,
      }
    default:
      return state;
  }
}
export default combineReducers({
  list,
  edit,
  remove,
  login
});
