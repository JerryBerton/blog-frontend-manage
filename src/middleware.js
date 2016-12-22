import config from './config/base.js';

import { message } from 'antd';
export const FETCH_API = Symbol('fetch API');

function combineAction(action, nextAction) {
  const newAction = Object.assign({}, action, nextAction);
  delete newAction[FETCH_API];
  return newAction;
}
// 处理  params
function generateParams(url, params) {
  let paramsArray = Object.keys(params).map((item) => ( `${item}=${params[item]}` ));
  let urlEncode = paramsArray.join("&")
  return `${url}?${urlEncode}`;
}

function fetchAPI(endpoint, req) {

  let parameter = {
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      credentials: 'include',
    }
  };
  switch (req.method) {
    case 'POST':
      parameter = {
          ...parameter,
         method: "post",
         body: JSON.stringify(req.body)
      }
      break;
    case 'PUT':
      parameter = {
        ...parameter,
        method: "put",
        body: JSON.stringify(req.body)
      }
      break;
    case 'DELETE':
      parameter = {
        ...parameter,
        method: 'delete'
      }
      break;
    case 'GET':
      parameter = {
        ...parameter,
        method: 'GET'
      }
      break;
    default:
  }
  endpoint = req.params ? generateParams(endpoint, req.params) : endpoint;
  return fetch(endpoint, parameter)
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {
      if (!response.ok) {
        message.warn("网络错误");
        return Promise.reject({ message: "网络错误" });
      } else if (json.code !== 0) {
        message.error(json.message);
        return Promise.reject({ message: json.message })
      }
      return json.result;
    })
}

export default store => next => action => {
  const rule = action[FETCH_API];
  if (typeof rule === "function" || typeof rule === "undefined") {
    return next(action);
  }
  const [requestStatus, successStatus, failureStatus] = rule.types;
  let endpoint = `${config.api}${rule.endpoint}`;
  return fetchAPI(endpoint, rule).then(
    resp => next(combineAction(
      action,
      { resp, type: successStatus }
    )),
    error => next(combineAction(
      action,
      { type: failureStatus }
    ))
  );
}
