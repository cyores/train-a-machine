import { UPDATE_MACHINE } from "../actions/index";

const initalState = {
    machine: ""
};

export default function imageReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_MACHINE:
            return Object.assign({}, state, {
                machine: action.machine
            });

        default:
            return state;
    }
}
