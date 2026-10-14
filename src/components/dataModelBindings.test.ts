import { describe, expect, it } from "@jest/globals";
import { WITHOUT_EXAMPLES } from "./componentsWithoutExamples.ts";
import componentGroups from "./index.ts";
import dataModelBindingKeys from "@arkitektum/altinn-studio-custom-components/dist/dataModelBindingKeys.json";

/**
 * Whether each example binds exactly the `dataModelBindings` keys its component reads.
 *
 * The components package lists the keys for each component that declares them. `expected` keys must all be bound, each `oneOf` group needs one of its keys, and when more are bound the first one in the group is read and the rest are ignored. `optional` keys may be left out, and `deprecated` keys are no longer read. An example that leaves a key out shows the component with part of it empty, and one that binds an old, ignored or misspelt key teaches the wrong markup. The statistics page in the components package checks every app's layouts against the same lists, by the same rules.
 */
interface DataModelBindingKeys {
    expected: string[];
    oneOf?: string[][];
    optional?: string[];
    deprecated: Record<string, string>;
}

const keysByTagName: Record<string, DataModelBindingKeys> = dataModelBindingKeys;

/** Every example, with the component it renders and the keys its markup binds. */
function examples() {
    return Object.values(componentGroups)
        .flatMap((group) => Object.values(group))
        .map((example) => ({ tagName: example.markup.tagName, boundKeys: Object.keys(example.markup.dataModelBindings || {}) }));
}

/** What an example binds wrong for its component, one line per finding. */
function findingsFor(tagName: string, boundKeys: string[], bindingKeys: DataModelBindingKeys) {
    const oneOfGroups = bindingKeys.oneOf || [];
    const knownKeys = [...bindingKeys.expected, ...oneOfGroups.flat(), ...(bindingKeys.optional || [])];
    return [
        ...bindingKeys.expected.filter((key) => !boundKeys.includes(key)).map((key) => `${tagName}: missing ${key}`),
        ...oneOfGroups.filter((group) => !group.some((key) => boundKeys.includes(key))).map((group) => `${tagName}: missing ${group.join(" or ")}`),
        ...oneOfGroups.flatMap((group) => {
            const [usedKey, ...ignoredKeys] = group.filter((key) => boundKeys.includes(key));
            return ignoredKeys.map((key) => `${tagName}: ignored ${key} (${usedKey} is read instead)`);
        }),
        ...boundKeys
            .filter((key) => Object.hasOwn(bindingKeys.deprecated, key))
            .map((key) => `${tagName}: deprecated ${key} (${bindingKeys.deprecated[key]})`),
        ...boundKeys
            .filter((key) => !knownKeys.includes(key) && !Object.hasOwn(bindingKeys.deprecated, key))
            .map((key) => `${tagName}: unknown ${key}`)
    ];
}

describe("the data model bindings the examples write", () => {
    it("bind exactly the keys each component reads", () => {
        const findings = examples().flatMap(({ tagName, boundKeys }) => {
            const bindingKeys = keysByTagName[tagName];
            return bindingKeys ? findingsFor(tagName, boundKeys, bindingKeys) : [];
        });

        expect(findings).toEqual([]);
    });

    it("cover every component the package declares keys for, except the ones the docs leave out on purpose", () => {
        // Without this, a renamed list or a moved file would leave the check above passing on nothing.
        const documented = new Set(examples().map((example) => example.tagName));
        const unchecked = Object.keys(keysByTagName).filter((tagName) => !documented.has(tagName) && !WITHOUT_EXAMPLES.includes(tagName));

        expect(unchecked).toEqual([]);
        expect(Object.keys(keysByTagName).filter((tagName) => documented.has(tagName)).length > 0).toBe(true);
    });
});

describe("findingsFor", () => {
    const bindingKeys = {
        expected: ["trueData"],
        oneOf: [["simpleBinding", "data"]],
        optional: ["dataTitle"],
        deprecated: { old: "Renamed to data" }
    };

    it("accepts either key of a group, with or without an optional key", () => {
        expect(findingsFor("c", ["trueData", "data"], bindingKeys)).toEqual([]);
        expect(findingsFor("c", ["trueData", "simpleBinding", "dataTitle"], bindingKeys)).toEqual([]);
    });

    it("reports a missing key, a group with nothing bound, an ignored key, a deprecated key and an unknown one", () => {
        expect(findingsFor("c", ["old", "typo"], bindingKeys)).toEqual([
            "c: missing trueData",
            "c: missing simpleBinding or data",
            "c: deprecated old (Renamed to data)",
            "c: unknown typo"
        ]);
        expect(findingsFor("c", ["trueData", "data", "simpleBinding"], bindingKeys)).toEqual(["c: ignored data (simpleBinding is read instead)"]);
    });
});
