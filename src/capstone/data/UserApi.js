import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default class UserApi {
  static verifyUser() {
    return axios
      .get('http://localhost:3001/user')
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  static registerUsers(userDetails) {
    userDetails.id = uuidv4();
    return axios
      .post('http://localhost:3001/user', userDetails)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  static async afterLoginFlag(id) {
    return await axios
      .patch(`http://localhost:3001/user/${id}`, { loginFlag: 1 })
      .then((response) => response.data)
      .catch((error) => {
        //  console.log(error);
      });
  }

  static async checkLoginFlag(id) {
    let loginFlag;
    await axios
      .get('http://localhost:3001/user/' + id)
      .then((response) => {
        // console.log('chechlogin flag : ', response.data);
        loginFlag = response.data.loginFlag;
        // console.log('loginflag : ' + loginFlag);
      })
      .catch((error) => {
        throw error;
      });

    return loginFlag;
  }

  static async logoutFlag(id) {
    return await axios
      .patch(`http://localhost:3001/user/${id}`, { loginFlag: 0 })
      .then((response) => response.data)
      .catch((error) => {
        //  console.log(error);
      });
  }

  static async loadUsersDetails(userID) {
    let user;
    await axios
      .get('http://localhost:3001/user/' + userID)
      .then((response) => {
        //console.log(response.data);
        user = response.data;
      })
      .catch((error) => {
        //  console.log(error);
      });

    // console.log(' user api user: ', user);
    return user;
  }
}
