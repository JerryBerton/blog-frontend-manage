import { FETCH_API } from "../middleware.js";
import { message} from 'antd';

export const CAROUSEL_LIST_REQUERY = 'CAROUSEL_LIST_REQUERY';
export const CAROUSEL_LIST_SUCCESS = 'CAROUSEL_LIST_SUCCESS';
export const CAROUSEL_LIST_FAILURE = 'CAROUSEL_LIST_FAILURE';

export function fetchList(params) {
  return {
    [FETCH_API]: {
      types: [CAROUSEL_LIST_REQUERY, CAROUSEL_LIST_SUCCESS, CAROUSEL_LIST_FAILURE],
      endpoint: '/authority/carousel',
      method: 'GET',
      params
    }
  }
}

export const CAROUSEL_EDIT_REQUERY = 'CAROUSEL_EDIT_REQUERY';
export const CAROUSEL_EDIT_SUCCESS = 'CAROUSEL_EDIT_SUCCESS';
export const CAROUSEL_EDIT_FAILURE = 'CAROUSEL_EDIT_FAILURE';

export function fetchEdit(data) {
  return {
    [FETCH_API]: {
      types: [CAROUSEL_EDIT_REQUERY, CAROUSEL_EDIT_SUCCESS, CAROUSEL_EDIT_FAILURE],
      endpoint: 'carousel',
      method: 'POST',
      sudo: true,
      body: data
    }
  }
}

export const CAROUSEL_DELETE_REQUERY = 'CAROUSEL_DELETE_REQUERY';
export const CAROUSEL_DELETE_SUCCESS = 'CAROUSEL_DELETE_SUCCESS';
export const CAROUSEL_DELETE_FAILURE = 'CAROUSEL_DELETE_FAILURE';
export function fetchRemove(id) {
  return {
    [FETCH_API]: {
      types: [CAROUSEL_DELETE_REQUERY, CAROUSEL_DELETE_SUCCESS, CAROUSEL_DELETE_FAILURE],
      endpoint: `carousel/${id}`,
      method: "DELETE",
      sudo: true
    }
  }
}
