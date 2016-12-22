import { FETCH_API } from "../middleware.js";
import { message} from 'antd';

export const TAG_LIST_REQUERY = 'TAG_LIST_REQUERY';
export const TAG_LIST_SUCCESS = 'TAG_LIST_SUCCESS';
export const TAG_LIST_FAILURE = 'TAG_LIST_FAILURE';

export function fetchList(params) {
  return {
    [FETCH_API]: {
      types: [TAG_LIST_REQUERY, TAG_LIST_SUCCESS, TAG_LIST_FAILURE],
      endpoint: '/authority/article',
      method: 'GET',
      params
    }
  }
}

export const TAG_EDIT_REQUERY = 'TAG_EDIT_REQUERY';
export const TAG_EDIT_SUCCESS = 'TAG_EDIT_SUCCESS';
export const TAG_EDIT_FAILURE = 'TAG_EDIT_FAILURE';

export function fetchAdd(data) {
  return {
    [FETCH_API]: {
      types: [TAG_EDIT_REQUERY, TAG_EDIT_SUCCESS, TAG_EDIT_FAILURE],
      endpoint: '/authority/tag',
      method: 'POST',
      body: data
    }
  }
}

export const TAG_DELETE_REQUERY = 'TAG_DELETE_REQUERY';
export const TAG_DELETE_SUCCESS = 'TAG_DELETE_SUCCESS';
export const TAG_DELETE_FAILURE = 'TAG_DELETE_FAILURE';
export function fetchRemove(id) {
  return {
    [FETCH_API]: {
      types: [TAG_DELETE_REQUERY, TAG_DELETE_SUCCESS, TAG_DELETE_FAILURE],
      endpoint: `/authority/tag/${id}`,
      method: "DELETE",
    }
  }
}
