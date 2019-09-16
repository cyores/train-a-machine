import { combineReducers } from "redux";

import classReducer from "./classReducer";
import sectionReducer from "./sectionReducer";

export default combineReducers({ classReducer, sectionReducer });
