import { describe, expect, it } from "@jest/globals";
import componentGroups from "./index.ts";
import dataModelBindingKeys from "@arkitektum/altinn-studio-custom-components/dist/dataModelBindingKeys.json";

/**
 * Whether each example binds exactly the `dataModelBindings` keys its component reads.
 *
 * The components package lists the keys for each component that declares them, and the ones it no longer reads. An example that leaves a key out shows the component with part of it empty, and one that binds an old or misspelt key teaches the wrong markup. The statistics page in the components package checks every app's layouts against the same lists.
 */
const keysByTagName: Record<string, { expected: string[]; deprecated: Record<string, string> }> = dataModelBindingKeys;

/** Every example, with the component it renders and the keys its markup binds. */
function examples() {
    return Object.values(componentGroups)
        .flatMap((group) => Object.values(group))
        .map((example) => ({ tagName: example.markup.tagName, boundKeys: Object.keys(example.markup.dataModelBindings || {}) }));
}

describe("the data model bindings the examples write", () => {
    it("bind exactly the keys each component reads", () => {
        const findings = examples().flatMap(({ tagName, boundKeys }) => {
            const bindingKeys = keysByTagName[tagName];
            if (!bindingKeys) return [];
            return [
                ...bindingKeys.expected.filter((key) => !boundKeys.includes(key)).map((key) => `${tagName}: missing ${key}`),
                ...boundKeys
                    .filter((key) => Object.hasOwn(bindingKeys.deprecated, key))
                    .map((key) => `${tagName}: deprecated ${key} (${bindingKeys.deprecated[key]})`),
                ...boundKeys
                    .filter((key) => !bindingKeys.expected.includes(key) && !Object.hasOwn(bindingKeys.deprecated, key))
                    .map((key) => `${tagName}: unknown ${key}`)
            ];
        });

        expect(findings).toEqual([]);
    });

    it("cover every component the package declares keys for", () => {
        // Without this, a renamed list or a moved file would leave the check above passing on nothing.
        const documented = new Set(examples().map((example) => example.tagName));

        expect(Object.keys(keysByTagName).filter((tagName) => !documented.has(tagName))).toEqual([]);
        expect(Object.keys(keysByTagName).length > 0).toBe(true);
    });
});
