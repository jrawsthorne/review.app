import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import movieReducer from './mediaReducer';
import authReducer from './authReducer';
import postReducer from './postReducer';
import feedReducer from './feedReducer';
import userReducer from './userReducer';
import subscriptionsReducer from './subscriptionsReducer';
import ratingsReducer from './ratingsReducer';
import peopleReducer from './peopleReducer';

export default combineReducers({
  media: movieReducer,
  router: routerReducer,
  auth: authReducer,
  posts: postReducer,
  feed: feedReducer,
  users: userReducer,
  subscriptions: subscriptionsReducer,
  ratings: ratingsReducer,
  people: peopleReducer,
});
