'use strict';
import { combineReducers } from 'redux';

import {
  REPTILE_LIST_REQUERY,
  REPTILE_LIST_SUCCESS,
  REPTILE_LIST_FAILURE,
  REPTILE_CAPTURE_REQUERY,
  REPTILE_CAPTURE_SUCCESS,
  REPTILE_CAPTURE_FAILURE,
  REPTILE_DELETE_REQUERY,
  REPTILE_DELETE_SUCCESS,
  REPTILE_DELETE_FAILURE,
} from "../actions/reptile.js";

const list = (state = {}, action) => {
  switch (action.type) {
    case REPTILE_LIST_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case REPTILE_LIST_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case REPTILE_LIST_FAILURE:
      return {
        ...state,
        completed: false,
      }
    default:
      return state;
  }
}

const capture = (state = {}, action) => {
  switch (action.type) {
    case REPTILE_CAPTURE_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case REPTILE_CAPTURE_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case REPTILE_CAPTURE_FAILURE:
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
    case REPTILE_DELETE_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case REPTILE_DELETE_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case REPTILE_DELETE_FAILURE:
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
  capture,
  remove
});
