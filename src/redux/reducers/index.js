import { combineReducers } from 'redux';
import rooms from './rooms';
import user from './user';

export default combineReducers({ rooms, user });
