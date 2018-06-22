import { combineReducers } from "redux";
import weather from "./weather";
import { penderReducer as pender } from "redux-pender";

export default combineReducers({
  weather,
  pender
});
