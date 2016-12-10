import 'core-js/fn/object/assign';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import store from './model/';

import routes from './routes';
useStrict(true)
ReactDOM.render(
  <Provider { ...store }>
    { routes }
  </Provider>,
  document.getElementById('app'));
