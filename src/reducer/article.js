'use strict';
import { combineReducers } from 'redux';

import {
  ARTICLE_LIST_REQUERY,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_LIST_FAILURE,
  ARTICLE_EDIT_REQUERY,
  ARTICLE_EDIT_SUCCESS,
  ARTICLE_EDIT_FAILURE,
  ARTICLE_DELETE_REQUERY,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DELETE_FAILURE,
} from "../actions/article.js";

const list = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_LIST_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case ARTICLE_LIST_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case ARTICLE_LIST_FAILURE:
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
    case ARTICLE_EDIT_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case ARTICLE_EDIT_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case ARTICLE_EDIT_FAILURE:
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
    case ARTICLE_DELETE_REQUERY:
      return {
        ...state,
        completed: false,
      }
    case ARTICLE_DELETE_SUCCESS:
      return {
        ...state,
        completed: true,
        result: action.resp
      }
    case ARTICLE_DELETE_FAILURE:
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
