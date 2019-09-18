// CLASS
export const ADD_CLASS = "ADD_CLASS";
export const DELETE_CLASS = "DELETE_CLASS";
export const UPDATE_CLASS = "UPDATE_CLASS";

export function addClass(newClass) {
    return { type: ADD_CLASS, newClass };
}

export function deleteClass(classID) {
    return { type: DELETE_CLASS, classID };
}

export function updateClass(classID, newName) {
    return { type: UPDATE_CLASS, classID, newName };
}

// SECTION
export const UPDATE_ACTIVE_SECTION = "UPDATE_ACTIVE_SECTION";

export function updateActiveSection(section) {
    return { type: UPDATE_ACTIVE_SECTION, section };
}

// IMAGE
export const ADD_IMAGE_BATCH = "ADD_IMAGE_BATCH";
export const ADD_TEST_IMAGES = "ADD_TEST_IMAGES";

export function addImageBatch(labeledImages) {
    return { type: ADD_IMAGE_BATCH, labeledImages };
}

export function addTestImages(images) {
    return { type: ADD_TEST_IMAGES, images };
}

// MACHINE
export const UPDATE_MACHINE = "UPDATE_MACHINE";

export function updateMachine(machine) {
    return { type: UPDATE_MACHINE, machine };
}