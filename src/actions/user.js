import { FETCH_API } from "../middleware.js";
import { message} from 'antd';

export const USER_LIST_REQUERY = 'USER_LIST_REQUERY';
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS';
export const USER_LIST_FAILURE = 'USER_LIST_FAILURE';

export function fetchList(params) {
  return {
    [FETCH_API]: {
      types: [USER_LIST_REQUERY, USER_LIST_SUCCESS, USER_LIST_FAILURE],
      endpoint: '/authority/article',
      method: 'GET',
      params
    }
  }
}

export const USER_EDIT_REQUERY = 'USER_EDIT_REQUERY';
export const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS';
export const USER_EDIT_FAILURE = 'USER_EDIT_FAILURE';

export function fetchEdit(data, id) {
  let endpoint = '/authority/article';
  let method = "POST";
  if (id) {
    endpoint = `/authority/article/${id}`;
    method = "PUT"
  }
  return {
    [FETCH_API]: {
      types: [USER_EDIT_REQUERY, USER_EDIT_SUCCESS, USER_EDIT_FAILURE],
      endpoint,
      method,
      body: data
    }
  }
}

export const USER_DELETE_REQUERY = 'USER_DELETE_REQUERY';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE';
export function fetchRemove(id) {
  return {
    [FETCH_API]: {

      types: [USER_DELETE_REQUERY, USER_DELETE_SUCCESS, USER_DELETE_FAILURE],
      endpoint: `carousel/${id}`,
      method: "DELETE",
      sudo: true
    }
  }
}

export const USER_LOGIN_REQUERY = 'USER_LOGIN_REQUERY';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export function fetchLogin(data) {
  return {
    [FETCH_API]: {
      types: [USER_LOGIN_REQUERY, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE],
      endpoint: '/user/login',
      method: 'POST',
      sudo: true,
      body: data
    }
  }
}
