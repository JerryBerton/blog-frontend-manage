'use strict';
import { combineReducers } from 'redux';

import {
  CATEGORY_LIST_REQUERY,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE,
  CATEGORY_EDIT_REQUERY,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAILURE,
  CATEGORY_DELETE_REQUERY,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAILURE,
} from "../actions/category.js";

const list = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case CATEGORY_LIST_FAILURE:
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
    case CATEGORY_EDIT_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case CATEGORY_EDIT_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case CATEGORY_EDIT_FAILURE:
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
    case CATEGORY_DELETE_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case CATEGORY_DELETE_FAILURE:
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
  remove
});
