
import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute } from 'react-router';
import UserLogin from './components/user/login';
import App from './components/home/';
import Layout from './components/layout/';
import Carousel from './components/carousel/';
import ArticleList from './components/article/';
import ArticleAdd from './components/article/add';
import CategoryList from './components/category/';
const routes = (
  <Router history={browserHistory}>
    <Route path="login" component={UserLogin}/>
    <Route path="/" component={Layout}>
      <IndexRoute component={App}/>
      <Route path="resource">
        <Route path="carousel" component={Carousel}/>
      </Route>
      <Route path="article">
        <Route path="list" component={ArticleList}/>
        <Route path="add" component={ArticleAdd}/>
      </Route>
      <Route path="category" component={CategoryList}/>
    </Route>
 </Router>
)
export default routes;
