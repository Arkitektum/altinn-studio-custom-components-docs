// Constants
import componentNames from "../constants/componentNames.js";
import componentTypeNames from "../constants/componentTypeNames.js";

/**
 * Returns the component name corresponding to a given tag name.
 *
 * Searches the `componentNames` object for a key matching the provided `tagName`.
 * If a match is found, returns the associated component name; otherwise, returns the original `tagName`.
 *
 * @param {string} tagName - The tag name to look up.
 * @returns {string} The corresponding component name, or the original tag name if not found.
 */
export function getComponentNameFromTagName(tagName) {
    return componentNames[tagName] ?? tagName;
}

/**
 * Returns the component type name corresponding to the given key.
 * If the key is not found in the componentTypeNames mapping, returns the key itself.
 *
 * @param {string} key - The key to look up in the componentTypeNames mapping.
 * @returns {string} The component type name if found, otherwise the original key.
 */
export function getComponentTypeNameFromKey(key) {
    return componentTypeNames[key] ?? key;
}
