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

// MACHINE
export const START_MACHINE = "START_MACHINE";
export const UPDATE_MACHINE = "UPDATE_MACHINE";

export function startMachine() {
    return { type: START_MACHINE };
}

export function updateMachine(machine) {
    return { type: UPDATE_MACHINE, machine };
}
