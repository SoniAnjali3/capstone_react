import * as types from '../../capstone/actions/ActionTypes';
import userReducer from '../../capstone/reducers/userReducer';

describe('userReducer ', () => {
  it('should retrun default state', () => {
    const newState = userReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  it('should retrun new State if receiving type', () => {
    const usersTest = [
      {
        EmailID: 'anjali@gmail.com',
        Password: 'anjali',
        FirstName: 'Anjali',
        LastName: 'Soni',
        Location: 'Bangalore',
        MobileNumber: '1234567890',
        loginFlag: 0,
        id: 1,
      },
      {
        EmailID: 'pratik@gmail.com',
        Password: 'pratik',
        FirstName: 'Pratik',
        LastName: 'Jaswant',
        Location: 'Pune',
        MobileNumber: '0987654321',
        loginFlag: 1,
        id: 2,
      },
    ];
    const newState = userReducer(undefined, {
      type: types.LOAD_USERS_SUCCESS,
      users: usersTest,
    });
    expect(newState).toEqual(usersTest);
  });
});
