'use strict';
import { combineReducers } from 'redux';

import {
  CAROUSEL_LIST_REQUERY,
  CAROUSEL_LIST_SUCCESS,
  CAROUSEL_LIST_FAILURE,
  CAROUSEL_EDIT_REQUERY,
  CAROUSEL_EDIT_SUCCESS,
  CAROUSEL_EDIT_FAILURE,
  CAROUSEL_DELETE_REQUERY,
  CAROUSEL_DELETE_SUCCESS,
  CAROUSEL_DELETE_FAILURE,
} from "../actions/carousel.js";

const list = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_LIST_REQUERY:
      return {
        ...state,
        isFetch: false,
      }
    case CAROUSEL_LIST_SUCCESS:
      return {
        ...state,
        isFetching: true,
        content: action.resp
      }
    case CAROUSEL_LIST_FAILURE:
      return {
        ...state,
        isFetch: false,
      }
    default:
      return state;
  }
}

const edit = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_EDIT_REQUERY:
      return {
        ...state,
        isFetch: false,
      }
    case CAROUSEL_EDIT_SUCCESS:
      return {
        ...state,
        isFetching: true,
        content: action.resp
      }
    case CAROUSEL_EDIT_FAILURE:
      return {
        ...state,
        isFetch: false,
      }
    default:
      return state;
  }
}

const remove = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_DELETE_REQUERY:
      return {
        ...state,
        isFetch: false,
      }
    case CAROUSEL_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: true,
        content: action.resp
      }
    case CAROUSEL_DELETE_FAILURE:
      return {
        ...state,
        isFetch: false,
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
