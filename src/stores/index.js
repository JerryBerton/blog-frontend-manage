import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import fetchMiddleWare from '../middleware';
import rootReducer from '../reducer/';

// DevTools专用配置
let reduxDevTools = function () {
  if( typeof window === 'object'
    && typeof window.devToolsExtension !== 'undefined') {
    return window.devToolsExtension()
  } else {
    return f => f
  }
};

const configureStore = compose(
  applyMiddleware(thunkMiddleware, fetchMiddleWare),
  reduxDevTools()
)(createStore);

export default function(initialState) {
  return configureStore(rootReducer, initialState);
};
