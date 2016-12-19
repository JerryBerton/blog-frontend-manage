import 'core-js/fn/object/assign';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router';
import { Provider } from 'react-redux';


import 'antd/dist/antd.css';

import './index.scss';

import configureStore from './stores/';

import routes from './routes';
let store = configureStore();

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById('app'));
