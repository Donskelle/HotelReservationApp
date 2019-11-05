import {
  LOADING_USER,
  LOGIN_ERROR,
  LOGOUT_USER,
  LOGOUT_ERROR,
  SET_USER,
  SET_LANGUAGE,
  UserActionTypes
} from '../actions/user/types';

export interface State {
  language: string
  loading?: boolean
  loadingError?: typeof Error
  logoutError?: typeof Error

}

export default function(state = { language: 'en' }, action : UserActionTypes) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    }
    case LOADING_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.payload,
        loading: false
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logoutError: action.payload,
        loading: false
      };
    }
    case LOGOUT_USER: {
      return {
        language: state.language,
        loading: false
      };
    }
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
}
