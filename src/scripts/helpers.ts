// Constants
import componentNames from "../constants/componentNames.ts";
import componentTypeNames from "../constants/componentTypeNames.ts";

/**
 * Returns the component name corresponding to a given tag name.
 *
 * Searches the `componentNames` object for a key matching the provided `tagName`.
 * If a match is found, returns the associated component name; otherwise, returns the original `tagName`.
 *
 * Callers read the tag name off an example that may not have one, so nothing is a valid argument and comes
 * straight back out. Narrowing this to a required string would push a guard onto every call site for no gain.
 *
 * @param tagName - The tag name to look up.
 * @returns The corresponding component name, the original tag name if it is not known, or nothing if none was given.
 */
export function getComponentNameFromTagName(tagName?: string): string | undefined {
    if (tagName === undefined) {
        return undefined;
    }
    return componentNames[tagName] ?? tagName;
}

/**
 * Returns the component type name corresponding to the given key.
 * If the key is not found in the componentTypeNames mapping, returns the key itself.
 *
 * As above, a missing key comes straight back out rather than being rejected.
 *
 * @param key - The key to look up in the componentTypeNames mapping.
 * @returns The component type name if found, the original key if it is not known, or nothing if none was given.
 */
export function getComponentTypeNameFromKey(key?: string): string | undefined {
    if (key === undefined) {
        return undefined;
    }
    return componentTypeNames[key] ?? key;
}
