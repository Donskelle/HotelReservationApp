import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { loginUser } from './user';

const mockStore = configureMockStore([thunk]);

describe('User Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {},
      rooms: {}
    });
  });

  describe('loginUser action', () => {
    it('sucess login', async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            id: 0,
            user: {
              name: 'Admin',
              username: 'admin',
              token: '123'
            },
            refreshToken: '123'
          }
        })
      );

      await store.dispatch(loginUser());
      const actions = store.getActions();

      expect(actions[0].type).toEqual('LOADING_USER');
      expect(actions[1].type).toEqual('SET_USER');
      expect(actions[1].user.name).toEqual('Admin');
    });

    it('error on loginUser', async () => {
      mockAxios.get.mockImplementationOnce(() =>
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject('Something bad happened')
      );

      store.dispatch(loginUser());
      await new Promise(resolve => window.setTimeout(resolve, 5));
      const actions = store.getActions();

      expect(actions[0].type).toEqual('LOADING_USER');
      expect(actions[1].type).toEqual('LOGIN_ERROR');
      expect(actions[1].error).toEqual('Something bad happened');
    });
  });
});
