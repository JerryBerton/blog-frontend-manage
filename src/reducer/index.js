import { combineReducers } from 'redux';

import carousel from './carousel.js';
import article from './article.js';
import category from './category.js'
export default combineReducers({
  carousel,
  article,
  category
});
