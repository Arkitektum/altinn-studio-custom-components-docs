import { describe, expect, it } from "@jest/globals";
import { WITHOUT_EXAMPLES } from "./componentsWithoutExamples.ts";
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
 * recorded in one of the three lists in componentsWithoutExamples.ts. Between them they cover everything the package ships that has no example,
 * so a component reaching this test unlisted is genuinely new.
 */

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
