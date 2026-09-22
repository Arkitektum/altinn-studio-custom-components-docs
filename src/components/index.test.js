import componentGroups from "./index.js";
import { customElementTagNames } from "@arkitektum/altinn-studio-custom-components-utils";

/**
 * Whether the docs still cover what the components package ships.
 *
 * The two lists do not know about each other. `customElementTagNames` is maintained in the utils package alongside
 * the components themselves; the examples here are added by hand, one file per component. Nothing reconciles them,
 * so a component added to the package simply never appears in the docs, and nobody finds out — the docs are built
 * from the examples that exist, not from the components that do.
 *
 * This fails when that happens, rather than reporting it, because the answer is always the same: write the example.
 * The components that have no example today are listed below instead of being discovered afresh on every run.
 */

/**
 * Components deliberately without an example of their own: the primitives the data components are built out of.
 * They take their content from attributes rather than from a data model, so an example would demonstrate the
 * wrapper rather than anything a form author would write.
 */
const PRIMITIVES_WITHOUT_EXAMPLES = [
    "custom-description-list",
    "custom-divider",
    "custom-feedback",
    "custom-field",
    "custom-header",
    "custom-list",
    "custom-matrix",
    "custom-paragraph",
    "custom-summation",
    "custom-table"
];

/**
 * Data components that ship without an example. These are gaps rather than decisions: each one is a component a
 * form author can use and cannot look up here. Delete an entry when its example is written — the test insists the
 * list stays accurate in both directions, so it cannot quietly outlive the gap.
 */
const UNDOCUMENTED = [
    "custom-feedback-data",
    "custom-feedbacklist-data",
    "custom-feedbacklist-validation-messages",
    "custom-field-grid",
    "custom-field-image",
    "custom-field-row",
    "custom-header-text-data"
];

/** Every example the docs offer, as { group, exportName, tagName }. */
function documentedExamples() {
    return Object.entries(componentGroups).flatMap(([group, examples]) =>
        Object.entries(examples).map(([exportName, example]) => ({
            group,
            exportName,
            tagName: example?.markup?.tagName
        }))
    );
}

describe("the examples the docs offer", () => {
    it("gives every example a tag name to render", () => {
        const nameless = documentedExamples().filter((example) => !example.tagName);

        expect(nameless.map((example) => `${example.group}.${example.exportName}`)).toEqual([]);
    });

    it("demonstrates only components the package actually ships", () => {
        // A renamed or removed component leaves an example behind that renders nothing, and the page it is on says
        // so only by being blank.
        const published = new Set(customElementTagNames);
        const unknown = documentedExamples().filter((example) => example.tagName && !published.has(example.tagName));

        expect(unknown.map((example) => example.tagName)).toEqual([]);
    });

    it("demonstrates each component once, so no page silently replaces another", () => {
        const counts = new Map();
        for (const { tagName } of documentedExamples()) {
            counts.set(tagName, (counts.get(tagName) ?? 0) + 1);
        }

        expect([...counts.entries()].filter(([, count]) => count > 1).map(([tagName]) => tagName)).toEqual([]);
    });
});

describe("what the package ships without an example", () => {
    it("has an example for every component that is not listed as lacking one", () => {
        const documented = new Set(documentedExamples().map((example) => example.tagName));
        const excused = new Set([...PRIMITIVES_WITHOUT_EXAMPLES, ...UNDOCUMENTED]);

        const missing = customElementTagNames.filter((tagName) => !documented.has(tagName) && !excused.has(tagName));

        // A new component has shipped without an example. Add one under src/components/<type>/<tag-name>.js and
        // export it from index.js — or, if it is a primitive nobody writes directly, add it to the list above.
        expect(missing).toEqual([]);
    });

    it("lists only components that are still shipped", () => {
        const published = new Set(customElementTagNames);

        expect([...PRIMITIVES_WITHOUT_EXAMPLES, ...UNDOCUMENTED].filter((tagName) => !published.has(tagName))).toEqual([]);
    });

    it("lists only components that really have no example", () => {
        // The other direction: once an example is written, its entry has to go, or the list stops meaning anything.
        const documented = new Set(documentedExamples().map((example) => example.tagName));

        expect([...PRIMITIVES_WITHOUT_EXAMPLES, ...UNDOCUMENTED].filter((tagName) => documented.has(tagName))).toEqual([]);
    });
});
