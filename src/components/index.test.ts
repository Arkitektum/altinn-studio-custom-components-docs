import { describe, expect, it } from "@jest/globals";
import componentGroups from "./index.ts";
import { customElementTagNames } from "@arkitektum/altinn-studio-custom-components-utils";

/**
 * Whether the docs still cover what the components package ships.
 *
 * The two lists do not know about each other. `customElementTagNames` is maintained in the utils package alongside
 * the components themselves; the examples here are added by hand, one file per component. Nothing reconciles them,
 * so a component added to the package simply never appears in the docs, and nobody finds out — the docs are built
 * from the examples that exist, not from the components that do.
 *
 * This fails when that happens, rather than reporting it, because the answer is usually the same: write the example.
 * Where it is not — a primitive, a component built only by other components, or one on its way out — the reason is
 * recorded in one of the three lists below. Between them they cover everything the package ships that has no example,
 * so a component reaching this test unlisted is genuinely new.
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
 * Components that exist for other components to build with, rather than for a form author to write. The feedback
 * stack is three deep — validation messages builds a feedback list, which builds one feedback item per message — and
 * an app names none of them.
 */
const BUILT_BY_OTHER_COMPONENTS = ["custom-feedback-data", "custom-feedbacklist-data", "custom-feedbacklist-validation-messages"];

/**
 * On their way out, so an example would document something nobody should start using:
 *
 *   custom-field-grid, custom-field-row   being replaced by custom-matrix, which custom-matrix-data already shows
 *   custom-field-image                    being replaced by custom-image, which has not shipped yet
 *   custom-header-text-data               unused, and to be removed
 *
 * These still ship, so they are listed here rather than simply absent. When one is finally dropped from the package,
 * "lists only components that are still shipped" fails — which is the reminder to delete its line.
 */
const SUPERSEDED = ["custom-field-grid", "custom-field-image", "custom-field-row", "custom-header-text-data"];

/** One example as this test reads it: where it sits, what it is exported as, and which component it renders. */
interface DocumentedExample {
    group: string;
    exportName: string;
    tagName: string | undefined;
}

/** Every example the docs offer. */
function documentedExamples(): DocumentedExample[] {
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
        const counts: Map<string | undefined, number> = new Map();
        for (const { tagName } of documentedExamples()) {
            counts.set(tagName, (counts.get(tagName) ?? 0) + 1);
        }

        expect([...counts.entries()].filter(([, count]) => count > 1).map(([tagName]) => tagName)).toEqual([]);
    });
});

/** Everything the package ships that is deliberately not demonstrated, whatever the reason. */
const WITHOUT_EXAMPLES = [...PRIMITIVES_WITHOUT_EXAMPLES, ...BUILT_BY_OTHER_COMPONENTS, ...SUPERSEDED];

describe("what the package ships without an example", () => {
    it("has an example for every component not listed as going without one", () => {
        const documented = new Set(documentedExamples().map((example) => example.tagName));
        const excused = new Set(WITHOUT_EXAMPLES);

        const missing = customElementTagNames.filter((tagName) => !documented.has(tagName) && !excused.has(tagName));

        // A new component has shipped without an example. Add one under src/components/<type>/<tag-name>.js and
        // export it from index.js — or, if it is not for a form author to write, add it to the right list above
        // with the reason.
        expect(missing).toEqual([]);
    });

    it("lists only components that are still shipped", () => {
        // How a superseded component leaves the lists: once it is dropped from the package, this is what says so.
        const published = new Set(customElementTagNames);

        expect(WITHOUT_EXAMPLES.filter((tagName) => !published.has(tagName))).toEqual([]);
    });

    it("lists only components that really have no example", () => {
        // The other direction: if an example is ever written, its entry has to go, or the lists stop meaning anything.
        const documented = new Set(documentedExamples().map((example) => example.tagName));

        expect(WITHOUT_EXAMPLES.filter((tagName) => documented.has(tagName))).toEqual([]);
    });

    it("gives each component one reason, not two", () => {
        const counts = new Map();
        for (const tagName of WITHOUT_EXAMPLES) {
            counts.set(tagName, (counts.get(tagName) ?? 0) + 1);
        }

        expect([...counts.entries()].filter(([, count]) => count > 1).map(([tagName]) => tagName)).toEqual([]);
    });
});
