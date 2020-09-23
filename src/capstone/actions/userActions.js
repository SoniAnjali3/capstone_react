import * as types from './ActionTypes';
import UserApi from '../data/UserApi';

export function loadUserSuccess(users) {
  // console.log("users in loadUserSuccess", users)
  return { type: types.LOAD_USERS_SUCCESS, users };
}

export function addUserSuccess(users) {
  //console.log("users in addUserSuccess", users)
  return { type: types.ADD_USER_SUCCESS, users };
}

export function loginFlagSuccess(id) {
  // console.log("id in loginFlagSuccess", id)
  return { type: types.AFTER_LOGIN_FLAG, id };
}
export function getUserProfileSuccess(user) {
  return { type: types.GET_USER_PROFILE, user };
}

export function loadUsers() {
  return function (dispatch) {
    //this called thunk function which is actually funct of dispatch, asyn fnct
    return UserApi.verifyUser()
      .then((users) => {
        // console.log(users, " : inside loaduser users")
        dispatch(loadUserSuccess(users));
        // console.log("loadUserSuccess done****")
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addUser(user) {
  return function (dispatch, getState) {
    return UserApi.registerUsers(user)
      .then((user) => {
        //  console.log("inside addUser userAction : " , user)
        dispatch(addUserSuccess(user));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function afterLogin(id) {
  return function (dispatch, getState) {
    return UserApi.afterLoginFlag(id)
      .then((id) => {
        //  console.log("inside afterLogin : " , id)
        dispatch(loginFlagSuccess(id));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function getUserProfile(userID) {
  return function (dispatch) {
    //this called thunk function which is actually funct of dispatch, asyn fnct
    return UserApi.loadUsersDetails(userID)
      .then((users) => {
        // console.log(users, ' : inside getUserProfile users');
        dispatch(getUserProfileSuccess(users));
        // console.log("loadUserSuccess done****")
      })
      .catch((error) => {
        throw error;
      });
  };
}
