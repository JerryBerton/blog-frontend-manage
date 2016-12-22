import { FETCH_API } from "../middleware.js";
import { message} from 'antd';

export const CATEGORY_LIST_REQUERY = 'CATEGORY_LIST_REQUERY';
export const CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS';
export const CATEGORY_LIST_FAILURE = 'CATEGORY_LIST_FAILURE';

export function fetchList(params) {
  return {
    [FETCH_API]: {
      types: [CATEGORY_LIST_REQUERY, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAILURE],
      endpoint: '/authority/category',
      method: 'GET',
      params
    }
  }
}

export const CATEGORY_EDIT_REQUERY = 'CATEGORY_EDIT_REQUERY';
export const CATEGORY_EDIT_SUCCESS = 'CATEGORY_EDIT_SUCCESS';
export const CATEGORY_EDIT_FAILURE = 'CATEGORY_EDIT_FAILURE';

export function fetchEdit(data, id ) {
  let endpoint = '/authority/category';
  let method = "POST";
  if (id) {
    endpoint = `/authority/category/${id}`;
    method = "PUT"
  }
  return {
    [FETCH_API]: {
      types: [CATEGORY_EDIT_REQUERY, CATEGORY_EDIT_SUCCESS, CATEGORY_EDIT_FAILURE],
      endpoint,
      method,
      body: data
    }
  }
}

export const CATEGORY_DELETE_REQUERY = 'CATEGORY_DELETE_REQUERY';
export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
export const CATEGORY_DELETE_FAILURE = 'CATEGORY_DELETE_FAILURE';
export function fetchRemove(id) {
  return {
    [FETCH_API]: {
      types: [CATEGORY_DELETE_REQUERY, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAILURE],
      endpoint: `/authority/category/${id}`,
      method: "DELETE",
    }
  }
}
