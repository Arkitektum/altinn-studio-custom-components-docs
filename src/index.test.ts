import type { ComponentExample, ComponentMarkup } from "./types.ts";
import { describe, expect, it, jest } from "@jest/globals";
import type { DataModel } from "./data/dataModels.ts";
import { getResults } from "./index.ts";

const dataModels: DataModel[] = [
    {
        data: {
            customTable: {
                data: [{ navn: "Ola Nordmann" }]
            }
        }
    }
];

/** An example with no tag name, which is what getResults is expected to drop. Malformed on purpose. */
const brokenExample = { markup: { id: "no-tag" } } as unknown as ComponentExample;

function exampleFor(tagName: string, extraMarkup: Partial<ComponentMarkup> = {}): ComponentExample {
    return {
        markup: {
            id: tagName,
            type: "Custom",
            tagName,
            ...extraMarkup
        }
    };
}

describe("getResults", () => {
    it("returns one entry per component type, keeping the markup with it", () => {
        const results = getResults(
            {
                table: { customTableData: exampleFor("custom-table-data") },
                matrix: { customMatrixData: exampleFor("custom-matrix-data") }
            },
            dataModels
        );

        expect(results.map((result) => result.type)).toEqual(["table", "matrix"]);
        expect(results[0]!.components).toHaveLength(1);
        expect(results[0]!.components[0]!.markup.tagName).toBe("custom-table-data");
        expect(results[0]!.components[0]!.element).toBeInstanceOf(window.HTMLElement);
    });

    it("resolves the bound data from the data model", () => {
        const results = getResults(
            {
                table: {
                    customTableData: exampleFor("custom-table-data", { dataModelBindings: { data: "customTable.data" } })
                }
            },
            dataModels
        );

        expect(results[0]!.components[0]!.data).toEqual({ data: [{ navn: "Ola Nordmann" }] });
    });

    it("skips an example with no tag name", () => {
        const results = getResults(
            {
                table: {
                    broken: brokenExample,
                    customTableData: exampleFor("custom-table-data")
                }
            },
            dataModels
        );

        expect(results[0]!.components).toHaveLength(1);
        expect(results[0]!.components[0]!.markup.tagName).toBe("custom-table-data");
    });

    it("drops a type whose examples are all unusable, so no empty section renders", () => {
        const results = getResults(
            {
                table: { broken: brokenExample },
                matrix: { customMatrixData: exampleFor("custom-matrix-data") }
            },
            dataModels
        );

        expect(results.map((result) => result.type)).toEqual(["matrix"]);
    });

    it("keeps the gallery rendering when one example throws, showing an error preview instead", () => {
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        // createCustomElement rejects any tag outside the allow-list, so this example cannot build a preview.
        const results = getResults(
            {
                table: {
                    rejected: exampleFor("custom-not-in-the-allow-list"),
                    customTableData: exampleFor("custom-table-data")
                }
            },
            dataModels
        );

        expect(results[0]!.components).toHaveLength(2);
        const failed = results[0]!.components[0]!;
        expect(failed.element.classList.contains("component-example-error")).toBe(true);
        expect(failed.element.textContent).toContain("custom-not-in-the-allow-list");
        // The healthy example is unaffected.
        expect(results[0]!.components[1]!.element.classList.contains("component-example-error")).toBe(false);
        expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("custom-not-in-the-allow-list"), expect.anything());

        errorSpy.mockRestore();
    });

    it("renders the preview again with other data, leaving the first preview as it was", () => {
        const results = getResults(
            { table: { customTableData: exampleFor("custom-table-data", { dataModelBindings: { data: "customTable.data" } }) } },
            dataModels
        );
        const example = results[0]!.components[0]!;
        const firstPreview = example.element.outerHTML;

        const preview = example.renderPreview!(example.markup, { data: [{ navn: "Kari Nordmann" }] });

        expect(preview).not.toBe(example.element);
        expect(preview.querySelector("custom-table-data")!.getAttribute("formdata")).toBe(JSON.stringify({ data: [{ navn: "Kari Nordmann" }] }));
        expect(example.element.outerHTML).toBe(firstPreview);
    });

    it("renders the preview again with other markup", () => {
        const results = getResults({ table: { customTableData: exampleFor("custom-table-data", { hideTitle: false }) } }, dataModels);
        const example = results[0]!.components[0]!;

        const preview = example.renderPreview!({ ...example.markup, hideTitle: true }, example.data);

        expect(preview.querySelector("custom-table-data")!.getAttribute("hidetitle")).toBe("true");
        // A flag that is false is left out of the attributes altogether.
        expect(example.element.querySelector("custom-table-data")!.getAttribute("hidetitle")).toBeNull();
    });

    it("shows an error preview when rendering with other data fails", () => {
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        const results = getResults({ table: { customTableData: exampleFor("custom-table-data") } }, dataModels);
        // Data that refers to itself cannot be serialized into the formdata attribute.
        const circular: Record<string, unknown> = {};
        circular.self = circular;

        const preview = results[0]!.components[0]!.renderPreview!(results[0]!.components[0]!.markup, { data: circular });

        expect(preview.classList.contains("component-example-error")).toBe(true);
        expect(preview.textContent).toContain("custom-table-data");
        errorSpy.mockRestore();
    });

    it("gives an example that failed to render nothing to render again with", () => {
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        const results = getResults({ table: { rejected: exampleFor("custom-not-in-the-allow-list") } }, dataModels);

        expect(results[0]!.components[0]!.renderPreview).toBeUndefined();
        errorSpy.mockRestore();
    });

    it("returns no types at all when there are no examples", () => {
        expect(getResults({}, dataModels)).toEqual([]);
    });
});
