import { renderResults, renderSidebar, setupSidebarSearch } from "./renderers.js";

/** The two containers index.html provides for the rendered gallery. */
function givenAnEmptyPage() {
    document.body.innerHTML = '<aside id="sidebar"></aside><div id="component-docs-container"></div>';
}

/**
 * Two types with three examples between them, shaped the way getResults returns them.
 *
 * Every entry needs an `element`: that is the rendered preview, and renderPreviewElement appends it directly.
 */
function someResults() {
    return [
        {
            type: "table",
            components: [
                {
                    markup: { tagName: "custom-table-eiendom" },
                    element: document.createElement("div"),
                    data: { data: [{ gnr: 1 }] },
                    resources: { title: "Eiendom" }
                },
                { markup: { tagName: "custom-table-plan" }, element: document.createElement("div") }
            ]
        },
        {
            type: "matrix",
            components: [{ markup: { tagName: "custom-matrix-data" }, element: document.createElement("div") }]
        }
    ];
}

describe("renderResults", () => {
    beforeEach(givenAnEmptyPage);

    it("renders one section per component type, titled in Norwegian", () => {
        renderResults(someResults());

        const sections = document.querySelectorAll(".component-type-section");
        expect(sections).toHaveLength(2);
        expect(document.getElementById("component-type-table").textContent).toBe("Tabell");
        expect(document.getElementById("component-type-matrix").textContent).toBe("Matrise");
    });

    it("gives every example an anchor id and a heading", () => {
        renderResults(someResults());

        expect(document.getElementById("component-custom-table-eiendom")).not.toBeNull();
        expect(document.getElementById("component-custom-table-plan")).not.toBeNull();
        expect(document.getElementById("component-custom-matrix-data")).not.toBeNull();
        const headings = Array.from(document.querySelectorAll(".component-example h3")).map((heading) => heading.textContent);
        expect(headings).toEqual(["Eiendom", "Plan", "Data"]);
    });

    it("renders a code block for the markup, and for data and resources when present", () => {
        renderResults(someResults());

        const withData = document.getElementById("component-custom-table-eiendom");
        expect(withData.querySelector(".component-example-markup-title")).not.toBeNull();
        expect(withData.querySelector(".component-example-data-title")).not.toBeNull();
        expect(withData.querySelector(".component-example-resources-title")).not.toBeNull();

        // No data or resources on this one, so only the markup block should appear.
        const withoutData = document.getElementById("component-custom-table-plan");
        expect(withoutData.querySelector(".component-example-data-title")).toBeNull();
        expect(withoutData.querySelector(".component-example-resources-title")).toBeNull();
    });

    it("replaces earlier output instead of appending to it", () => {
        renderResults(someResults());
        renderResults(someResults());

        expect(document.querySelectorAll(".component-type-section")).toHaveLength(2);
    });
});

describe("renderSidebar", () => {
    beforeEach(givenAnEmptyPage);

    it("links every example to its section anchor", () => {
        renderSidebar(someResults());

        const links = Array.from(document.querySelectorAll("nav.component-type-list a"));
        expect(links.map((link) => link.getAttribute("href"))).toEqual([
            "#component-custom-table-eiendom",
            "#component-custom-table-plan",
            "#component-custom-matrix-data"
        ]);
    });

    it("groups the links per component type, expanded by default", () => {
        renderSidebar(someResults());

        const groups = Array.from(document.querySelectorAll("nav.component-type-list > details"));
        expect(groups).toHaveLength(2);
        expect(groups.map((group) => group.querySelector("summary").textContent)).toEqual(["Tabell", "Matrise"]);
        expect(groups.every((group) => group.open)).toBe(true);
    });

    it("records searchable text covering both the display name and the tag name", () => {
        renderSidebar(someResults());

        const first = document.querySelector("nav.component-type-list li");
        expect(first.dataset.searchText).toBe("eiendom custom-table-eiendom");
    });

    it("renders the empty state hidden", () => {
        renderSidebar(someResults());

        const emptyState = document.getElementById("sidebar-empty");
        expect(emptyState.hidden).toBe(true);
        expect(emptyState.textContent).toBe("Ingen komponenter samsvarer med søket.");
    });

    // Rendering twice is the normal case now: the page is prerendered at build time and rendered again on load.
    it("replaces an existing sidebar instead of appending a second one", () => {
        renderSidebar(someResults());
        renderSidebar(someResults());

        expect(document.querySelectorAll("nav.component-type-list")).toHaveLength(1);
        expect(document.querySelectorAll("nav.component-type-list a")).toHaveLength(3);
    });
});

describe("setupSidebarSearch", () => {
    /**
     * renderSidebar builds the filter input itself, so the wiring runs against that one.
     *
     * Note the searchable text is the display name plus the tag name, not the component type, so a query has to match
     * one of those two.
     */
    function givenAFilterableSidebar() {
        givenAnEmptyPage();
        renderSidebar(someResults());
        setupSidebarSearch();
        return document.getElementById("sidebar-search");
    }

    function typeInto(input, value) {
        input.value = value;
        input.dispatchEvent(new window.Event("input"));
    }

    const visibleItems = () => Array.from(document.querySelectorAll("nav.component-type-list li")).filter((item) => !item.hidden);

    it("keeps only the matching items", () => {
        const input = givenAFilterableSidebar();

        typeInto(input, "matrix");

        expect(visibleItems()).toHaveLength(1);
        expect(visibleItems()[0].textContent).toBe("Data");
    });

    it("matches on the tag name as well as the display name", () => {
        const input = givenAFilterableSidebar();

        typeInto(input, "custom-table-plan");
        expect(visibleItems().map((item) => item.textContent)).toEqual(["Plan"]);

        typeInto(input, "eiendom");
        expect(visibleItems().map((item) => item.textContent)).toEqual(["Eiendom"]);
    });

    it("hides a group with no matches", () => {
        const input = givenAFilterableSidebar();

        typeInto(input, "matrix");

        const groups = Array.from(document.querySelectorAll("nav.component-type-list > details"));
        expect(groups.map((group) => group.hidden)).toEqual([true, false]);
    });

    it("shows the empty state when nothing matches", () => {
        const input = givenAFilterableSidebar();

        typeInto(input, "finnes ikke");

        expect(document.getElementById("sidebar-empty").hidden).toBe(false);
        expect(visibleItems()).toHaveLength(0);
    });

    it("restores everything when the query is cleared", () => {
        const input = givenAFilterableSidebar();

        typeInto(input, "matrix");
        typeInto(input, "");

        expect(visibleItems()).toHaveLength(3);
        expect(document.getElementById("sidebar-empty").hidden).toBe(true);
    });

    it("clears the filter on Escape", () => {
        const input = givenAFilterableSidebar();

        typeInto(input, "matrix");
        input.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));

        expect(input.value).toBe("");
        expect(visibleItems()).toHaveLength(3);
    });

    it("does nothing when the sidebar has not been rendered", () => {
        givenAnEmptyPage();

        expect(() => setupSidebarSearch()).not.toThrow();
    });
});
