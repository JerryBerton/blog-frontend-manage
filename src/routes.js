
import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute } from 'react-router';
import App from './components/home/';
import Resource from './components/resource'
import Layout from './components/layout/';
import Carousel from './components/'
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={App}/>
<<<<<<< HEAD
      <Route path="resource">
        <Route path="carousel" component={Carousel}/>
      </Route>
=======
      <Route path="resource" component={Resource}/>
>>>>>>> d565e19cf384d23d26c75cdf141b44fd7d37ac91
    </Route>
 </Router>
)
export default routes;
