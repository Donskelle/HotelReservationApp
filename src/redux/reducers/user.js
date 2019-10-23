import {
  LOADING_USER,
  LOGIN_ERROR,
  LOGOUT_USER,
  LOGOUT_ERROR,
  SET_USER,
  SET_LANGUAGE
} from '../actions/user';

export default function(state = { language: 'en' }, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        ...action.user,
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
        loginError: action.error,
        loading: false
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logoutError: action.error,
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
        language: action.language
      };
    default:
      return state;
  }
}
