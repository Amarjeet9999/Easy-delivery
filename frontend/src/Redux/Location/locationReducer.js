import { SET_LOCATION_LOADING, SET_LOCATION_SUCCESS } from "./actionType";

const initialState = {
  isLoading: false,
  location: "",
};
export const locationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        location: payload,
      };
    case SET_LOCATION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
