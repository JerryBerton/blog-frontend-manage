'use strict';
import { combineReducers } from 'redux';

import {
  TAG_LIST_REQUERY,
  TAG_LIST_SUCCESS,
  TAG_LIST_FAILURE,
  TAG_EDIT_REQUERY,
  TAG_EDIT_SUCCESS,
  TAG_EDIT_FAILURE,
  TAG_DELETE_REQUERY,
  TAG_DELETE_SUCCESS,
  TAG_DELETE_FAILURE,
} from "../actions/tag.js";

const list = (state = {}, action) => {
  switch (action.type) {
    case TAG_LIST_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case TAG_LIST_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case TAG_LIST_FAILURE:
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
    case TAG_EDIT_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case TAG_EDIT_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case TAG_EDIT_FAILURE:
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
    case TAG_DELETE_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case TAG_DELETE_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case TAG_DELETE_FAILURE:
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
