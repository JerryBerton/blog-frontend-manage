import { combineReducers } from 'redux';

import carousel from './carousel.js';
import article from './article.js';
import category from './category.js';
import tag from './tag.js';
import user from './user.js';
export default combineReducers({
  carousel,
  article,
  category,
  tag,
  user
});
