import { combineReducers } from "redux";

import classReducer from "./classReducer";
import sectionReducer from "./sectionReducer";
import machineReducer from "./machineReducer";

export default combineReducers({
    classReducer,
    sectionReducer,
    machineReducer
});
