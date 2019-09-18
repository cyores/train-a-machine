import { ADD_IMAGE_BATCH, ADD_TEST_IMAGES } from "../actions/index";

// array of labeldImages objects
const initalState = {
    trainingImages: [],
    testImages: []
};

// labled imagefs looks like this:
// labeledImages = {
//     label: "",
//     images: []
// }

export default function imageReducer(state = initalState, action) {
    switch (action.type) {
        case ADD_IMAGE_BATCH:
            return Object.assign({}, state, {
                trainingImages: state.trainingImages.concat(
                    action.labeledImages
                )
            });
        case ADD_TEST_IMAGES:
            return Object.assign({}, state, {
                testImages: state.testImages.concat(action.images)
            });
        default:
            return state;
    }
}
