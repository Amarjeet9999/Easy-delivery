import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { authReducer } from "./Auth/authReducer";
import Thunk from "redux-thunk";
import { locationReducer } from "./Location/locationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(Thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
