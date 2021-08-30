import { combineReducers } from "redux";
import okrsDuck from "./okrsDuck";

const reducers = combineReducers({
  okrsReducer: okrsDuck,
});

export default reducers;
