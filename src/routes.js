
import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute } from 'react-router';
import App from './components/home/';
import Layout from './components/layout/';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={App}/>
    </Route>
 </Router>
)
export default routes;
