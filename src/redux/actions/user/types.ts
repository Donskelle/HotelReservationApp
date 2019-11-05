export const SET_USER = 'SET_USER';
export const LOADING_USER = 'LOADING_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_LANGUAGE = 'SET_LANGUAGE';

interface SetUser {
    type: typeof SET_USER
    payload: User
}

interface LogoutUser {
    type: typeof LOGOUT_USER
}

interface LoadingUser {
    type: typeof LOADING_USER
}

interface LoginError {
    type: typeof LOGIN_ERROR
    payload: typeof Error
}

interface LogoutError {
    type: typeof LOGOUT_ERROR
    payload: typeof Error
}

interface SetLanguage {
    type: typeof SET_LANGUAGE
    payload: Language
}

enum Language {
    de = 'de',
    en = 'en',
}

export interface User {
    name: string
    username: string
    token: string
}

export type UserActionTypes = SetUser | LogoutUser | LoadingUser | LoginError | LogoutError | SetLanguage;
