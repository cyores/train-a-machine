export const ADD_CLASS = "ADD_CLASS";

/**
 * Add Class.
 *
 * @param {string} newClass Name of new ML class.
 * 
 * @return {Object} Send to reducer.
 */
export function addClass(newClass) {
    return { type: ADD_CLASS, newClass };
}
