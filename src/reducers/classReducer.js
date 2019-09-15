import { ADD_CLASS } from "../actions/index";

export default function classReducer(state = [], action) {
    switch (action.type) {
        case ADD_CLASS:
            return Object.assign({}, state, {
                classes: state.classes.concat(action.newClass)
            });
        default:
            return state;
    }
}
