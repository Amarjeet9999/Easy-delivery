import { SET_LOCATION_LOADING, SET_LOCATION_SUCCESS } from "./actionType";

export const locationLoading = () => {
  return { type: SET_LOCATION_LOADING };
};

export const locationSuccess = (data) => {
  return { type: SET_LOCATION_SUCCESS, payload: data };
};
