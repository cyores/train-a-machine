import { UPDATE_ACTIVE_SECTION } from "../actions/index";

const initalState = {
    activeSection: "",
    doneSections: []
};

export default function classReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_ACTIVE_SECTION:
            let doneSections = state.doneSections;
            if (action.doneSection) {
                doneSections.push(state.activeSection);
            }
            return Object.assign({}, state, {
                activeSection: action.section,
                doneSections: doneSections
            });
        default:
            return state;
    }
}
