import { combineReducers } from "redux";

import classReducer from "./classReducer";
import sectionReducer from "./sectionReducer";
import imageReducer from "./imageReducer";

export default combineReducers({ classReducer, sectionReducer, imageReducer });
