import { combineReducers } from 'redux';

import carousel from './carousel.js';
import article from './article.js';
import category from './category.js';

import user from './user.js';
import reptile from './reptile';
export default combineReducers({
  reptile,
  carousel,
  article,
  category,
  user
});
