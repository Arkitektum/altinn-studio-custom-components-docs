// Constants
import componentNames from "../constants/componentNames";
import componentTypeNames from "../constants/componentTypeNames";

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
    const componentNameEntry = Object.entries(componentNames).find(([key]) => key === tagName);
    return componentNameEntry ? componentNameEntry[1] : tagName;
}

/**
 * Returns the component type name corresponding to the given key.
 * If the key is not found in the componentTypeNames mapping, returns the key itself.
 *
 * @param {string} key - The key to look up in the componentTypeNames mapping.
 * @returns {string} The component type name if found, otherwise the original key.
 */
export function getComponentTypeNameFromKey(key) {
    const componentTypeNameEntry = Object.entries(componentTypeNames).find(([typeKey]) => typeKey === key);
    return componentTypeNameEntry ? componentTypeNameEntry[1] : key;
}
