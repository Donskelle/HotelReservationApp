import axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';


import { createAxiosAuthConfig } from '../../../utils/authRequest';
import {
  LOADING_USER,
  SET_USER,
  LOGOUT_USER,
  LOGIN_ERROR,
  LOGOUT_ERROR,
} from './types'
import { RootState } from '../../store';


// eslint-disable-next-line no-unused-vars
export const loginUser = (username:string, password:string) => (dispatch : ThunkDispatch<{}, {}, any>) => {
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
        payload: user
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

export const lookupRefreshToken = () => (dispatch: ThunkDispatch<{}, {}, any>) => {
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
        payload: data.user
      });
    });
};

export const logout = () => (dispatch: ThunkDispatch<{}, {}, any>, getState: () => RootState) => {
  const config = createAxiosAuthConfig(getState());
  dispatch({
    type: LOADING_USER
  });

  axios
    // .post('/logout', config)
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
