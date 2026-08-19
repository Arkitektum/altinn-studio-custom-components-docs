import { getResults } from "./index.js";

const dataModels = [
    {
        data: {
            customTable: {
                data: [{ navn: "Ola Nordmann" }]
            }
        }
    }
];

function exampleFor(tagName, extraMarkup = {}) {
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
        expect(results[0].components).toHaveLength(1);
        expect(results[0].components[0].markup.tagName).toBe("custom-table-data");
        expect(results[0].components[0].element).toBeInstanceOf(window.HTMLElement);
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

        expect(results[0].components[0].data).toEqual({ data: [{ navn: "Ola Nordmann" }] });
    });

    it("skips an example with no tag name", () => {
        const results = getResults(
            {
                table: {
                    broken: { markup: { id: "no-tag" } },
                    customTableData: exampleFor("custom-table-data")
                }
            },
            dataModels
        );

        expect(results[0].components).toHaveLength(1);
        expect(results[0].components[0].markup.tagName).toBe("custom-table-data");
    });

    it("drops a type whose examples are all unusable, so no empty section renders", () => {
        const results = getResults(
            {
                table: { broken: { markup: { id: "no-tag" } } },
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

        expect(results[0].components).toHaveLength(2);
        const failed = results[0].components[0];
        expect(failed.element.classList.contains("component-example-error")).toBe(true);
        expect(failed.element.textContent).toContain("custom-not-in-the-allow-list");
        // The healthy example is unaffected.
        expect(results[0].components[1].element.classList.contains("component-example-error")).toBe(false);
        expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("custom-not-in-the-allow-list"), expect.anything());

        errorSpy.mockRestore();
    });

    it("returns no types at all when there are no examples", () => {
        expect(getResults({}, dataModels)).toEqual([]);
    });
});
