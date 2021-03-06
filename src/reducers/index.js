import { combineReducers } from 'redux';
import mediaReducer, * as fromMedia from './mediaReducer';
import authReducer from './authReducer';
import postReducer, * as fromPost from './postReducer';
import feedReducer, * as fromFeed from './feedReducer';
import userReducer, * as fromUser from './userReducer';
import subscriptionsReducer from './subscriptionsReducer';
import ratingsReducer from './ratingsReducer';
import peopleReducer, * as fromPeople from './peopleReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  media: mediaReducer,
  auth: authReducer,
  posts: postReducer,
  feed: feedReducer,
  users: userReducer,
  subscriptions: subscriptionsReducer,
  ratings: ratingsReducer,
  people: peopleReducer,
  comments: commentsReducer,
});

export const getFeed = state => fromFeed.getFeed(state.feed);
export const getPost = (state, postId) => fromPost.getPost(state.posts.items, postId);
export const getPosts = state => fromPost.getPosts(state.posts.items);
export const getPostState = (state, postId) =>
  fromPost.getPostState(state.posts.itemStates, postId);
export const getPerson = (state, personId) => fromPeople.getPerson(state.people.items, personId);
export const getPersonState = (state, personId) =>
  fromPeople.getPersonState(state.people.itemStates, personId);
export const getUser = (state, username) => fromUser.getUser(state.users.users, username);
export const getUserState = (state, username) => fromUser.getUserState(state.users.users, username);
export const getMediaItem = (state, mediaType, tmdbid) =>
  fromMedia.getMediaItem(state.media.items, mediaType, tmdbid);
