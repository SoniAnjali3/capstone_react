import * as types from '../actions/ActionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      // console.log('inside userReducer LOAD_PRODUCT_SUCCESS: ' + action.users);
      return action.users;

    case types.ADD_USER_SUCCESS:
      // console.log('inside userReducer ADD_USER_SUCCESS: ' + action.users);
      return action.users;

    case types.AFTER_LOGIN_FLAG:
      return null;
    case types.GET_USER_PROFILE:
      // console.log('inside userReducer GET_USER_PROFILE: ', action.user);
      return action.user;
    default:
      return state;
  }
}
