
import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute } from 'react-router';
import App from './components/home/';
import Layout from './components/layout/';
import Carousel from './components/'
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={App}/>
      <Route path="resource">
        <Route path="carousel" component={Carousel}/>
      </Route>
    </Route>
 </Router>
)
export default routes;
