
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { getCookie } from './tool/cookie';
import UserLogin from './components/user/login';
import App from './components/home/';
import Layout from './components/layout/';
import Carousel from './components/carousel/';
import ArticleList from './components/article/';
import ArticleAdd from './components/article/add';
import CategoryList from './components/category/';
import ReptileList from './components/reptile/';
import ReptileCapture from './components/reptile/capture';
const handleEnter = (nextState, replaceState, callback) => {
  if (getCookie('token')) {
    callback();
  } else {
    replaceState('/login');
    callback();
  }
}
const routes = (
  <Router history={browserHistory}>
    <Route path="login" component={UserLogin}/>
    <Route path="/manage" component={Layout} onEnter={handleEnter}>
      <IndexRoute component={App}/>
      <Route path="resource">
        <Route path="carousel" component={Carousel}/>
      </Route>
      <Route path="reptile" component={ReptileList}/>
      <Route path="reptile/capture/:id" component={ReptileCapture}/>
      <Route path="article">
        <Route path="list" component={ArticleList}/>
        <Route path="edit" component={ArticleAdd}/>
      </Route>
      <Route path="category" component={CategoryList}/>
    </Route>
 </Router>
)
export default routes;
