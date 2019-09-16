import { UPDATE_ACTIVE_SECTION } from "../actions/index";

const initalState = {
    activeSection: ""
};

export default function classReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_ACTIVE_SECTION:
            return Object.assign({}, state, {
                activeSection: action.section
            });
        default:
            return state;
    }
}
