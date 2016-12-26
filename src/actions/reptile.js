import { FETCH_API } from "../middleware.js";
import { message} from 'antd';

export const REPTILE_LIST_REQUERY = 'REPTILE_LIST_REQUERY';
export const REPTILE_LIST_SUCCESS = 'REPTILE_LIST_SUCCESS';
export const REPTILE_LIST_FAILURE = 'REPTILE_LIST_FAILURE';
export function fetchList(params) {
  return {
    [FETCH_API]: {
      types: [REPTILE_LIST_REQUERY, REPTILE_LIST_SUCCESS, REPTILE_LIST_FAILURE],
      endpoint: '/authority/reptiles',
      method: 'GET',
      params
    }
  }
}

export const REPTILE_CAPTURE_REQUERY = 'REPTILE_CAPTURE_REQUERY';
export const REPTILE_CAPTURE_SUCCESS = 'REPTILE_CAPTURE_SUCCESS';
export const REPTILE_CAPTURE_FAILURE = 'REPTILE_CAPTURE_FAILURE';

export function fetchCapture(params) {
  return {
    [FETCH_API]: {
      types: [REPTILE_CAPTURE_REQUERY, REPTILE_CAPTURE_SUCCESS, REPTILE_CAPTURE_FAILURE],
      endpoint:'/authority/reptile',
      method: "GET",
      params
    }
  }
}

export const REPTILE_DELETE_REQUERY = 'REPTILE_DELETE_REQUERY';
export const REPTILE_DELETE_SUCCESS = 'REPTILE_DELETE_SUCCESS';
export const REPTILE_DELETE_FAILURE = 'REPTILE_DELETE_FAILURE';
export function fetchRemove(id) {
  return {
    [FETCH_API]: {

      types: [REPTILE_DELETE_REQUERY, REPTILE_DELETE_SUCCESS, REPTILE_DELETE_FAILURE],
      endpoint: `carousel/${id}`,
      method: "DELETE",
      sudo: true
    }
  }
}
