import { combineReducers } from "redux";
import { repoReducer } from "./repoReducer";
import { contributorsReducer } from "./contributorsReducer";

export default combineReducers({
  repositories: repoReducer,
  contributors: contributorsReducer
});