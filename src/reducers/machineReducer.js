import {
    START_MACHINE,
    UPDATE_MACHINE,
} from "../actions/index";
import Machine from "../utils/Machine";

const initalState = {
    machine: ""
};

export default function imageReducer(state = initalState, action) {
    switch (action.type) {
        case START_MACHINE:
            return Object.assign({}, state, {
                machine: new Machine()
            });
        case UPDATE_MACHINE:
            return Object.assign({}, state, {
                machine: action.machine
            });
        default:
            return state;
    }
}
