import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOG_OUT,
} from "./actionTypes";

export const loginLoading = () => ({
  type: LOGIN_LOADING,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginError = (err) => ({
  type: LOGIN_ERROR,
  payload: err,
});

export const registerLoading = () => ({
  type: LOGIN_LOADING,
});

export const registerSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const registerError = (err) => ({
  type: LOGIN_ERROR,
  payload: err,
});

export const logout = () => ({
  type: LOG_OUT,
});
