import axios from 'axios';

import { createAxiosAuthConfig } from '../../utils/authRequest';

export const SET_USER = 'SET_USER';
export const LOADING_USER = 'LOADING_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_LANGUAGE = 'SET_LANGUAGE';

// eslint-disable-next-line no-unused-vars
export const loginUser = (username, password) => dispatch => {
  // const superSecureHash = password.toString();
  dispatch({
    type: LOADING_USER
  });
  // .post('/login', {
  //   username,
  //   password: superSecureHash
  // })

  axios
    .get('user/0')
    .then(({ data }) => {
      const { refreshToken, user } = data;
      dispatch({
        type: SET_USER,
        user
      });
      localStorage.setItem('refresh-token', refreshToken);
    })
    .catch(error =>
      dispatch({
        type: LOGIN_ERROR,
        error
      })
    );
};

export const lookupRefreshToken = () => dispatch => {
  const refreshToken = localStorage.getItem('refresh-token');
  if (!refreshToken) return;

  axios
    .get('user/0')
    // .post('/refreshToken', {
    //   refreshToken
    // })
    .then(({ data }) => {
      dispatch({
        type: SET_USER,
        user: data.user
      });
    });
};

export const logout = () => (dispatch, getState) => {
  const config = createAxiosAuthConfig(getState);
  dispatch({
    type: LOADING_USER
  });

  axios
    // .post('/logout',
    .get('/user/0', config)
    .then(() => {
      dispatch({
        type: LOGOUT_USER
      });

      localStorage.removeItem('refresh-token');
    })
    .catch(error =>
      // better error handling needed
      dispatch({
        type: LOGOUT_ERROR,
        error
      })
    );
};
