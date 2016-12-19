import { FETCH_API } from "../middleware.js";
import { message} from 'antd';

export const ARTICLE_LIST_REQUERY = 'ARTICLE_LIST_REQUERY';
export const ARTICLE_LIST_SUCCESS = 'ARTICLE_LIST_SUCCESS';
export const ARTICLE_LIST_FAILURE = 'ARTICLE_LIST_FAILURE';

export function fetchList(params) {
  return {
    [FETCH_API]: {
      types: [ARTICLE_LIST_REQUERY, ARTICLE_LIST_SUCCESS, ARTICLE_LIST_FAILURE],
      endpoint: '/authority/article',
      method: 'GET',
      params
    }
  }
}

export const ARTICLE_EDIT_REQUERY = 'ARTICLE_EDIT_REQUERY';
export const ARTICLE_EDIT_SUCCESS = 'ARTICLE_EDIT_SUCCESS';
export const ARTICLE_EDIT_FAILURE = 'ARTICLE_EDIT_FAILURE';

export function fetchEdit(data) {
  return {
    [FETCH_API]: {
      types: [ARTICLE_EDIT_REQUERY, ARTICLE_EDIT_SUCCESS, ARTICLE_EDIT_FAILURE],
      endpoint: '/authority/carousel',
      method: 'POST',
      sudo: true,
      body: data
    }
  }
}

export const ARTICLE_DELETE_REQUERY = 'ARTICLE_DELETE_REQUERY';
export const ARTICLE_DELETE_SUCCESS = 'ARTICLE_DELETE_SUCCESS';
export const ARTICLE_DELETE_FAILURE = 'ARTICLE_DELETE_FAILURE';
export function fetchRemove(id) {
  return {
    [FETCH_API]: {
      types: [ARTICLE_DELETE_REQUERY, ARTICLE_DELETE_SUCCESS, ARTICLE_DELETE_FAILURE],
      endpoint: `carousel/${id}`,
      method: "DELETE",
      sudo: true
    }
  }
}
