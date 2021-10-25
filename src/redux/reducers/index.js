import { combineReducers } from "redux";
import addItemsReducer from "./addItems";

const rootReducer = combineReducers({
  addItemsReducer,
});

export default (state, action) =>
  rootReducer(action.type === "LOGOUT_USER" ? undefined : state, action);
