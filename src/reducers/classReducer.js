import { ADD_CLASS, DELETE_CLASS, UPDATE_CLASS } from "../actions/index";

const initalState = {
    currID: 0,
    classes: []
};

export default function classReducer(state = initalState, action) {
    switch (action.type) {
        case ADD_CLASS:
            let nextId = state.currID + 1;
            return Object.assign({}, state, {
                currID: nextId,
                classes: state.classes.concat({
                    id: nextId,
                    name: action.newClass + " " + nextId
                })
            });
        case DELETE_CLASS:
            return Object.assign({}, state, {
                classes: state.classes.filter(item => item.id !== action.classID)
            });
        case UPDATE_CLASS: {
            console.log("updating", action.classID, action.newName);
            return Object.assign({}, state, {
                classes: state.classes.map(item => {
                    if (item.id === action.classID) {
                        return {
                            ...item,
                            name: action.newName
                        }
                    }
                    return item;
                })
            });
        }
        default:
            return state;
    }
}
