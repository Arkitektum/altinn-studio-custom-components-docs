import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { renderResults, renderSidebar, scrollIntoNearestView, setupMobileNav, setupSidebarSearch } from "./renderers.ts";
import type { ComponentTypeResult } from "../types.ts";

/** The two containers index.html provides for the rendered gallery. */
function givenAnEmptyPage() {
    document.body.innerHTML = '<aside id="sidebar"></aside><div id="component-docs-container"></div>';
}

/**
 * Two types with three examples between them, shaped the way getResults returns them.
 *
 * Every entry needs an `element`: that is the rendered preview, and renderPreviewElement appends it directly.
 */
function someResults(): ComponentTypeResult[] {
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
        expect(document.getElementById("component-type-table")!.textContent).toBe("Tabell");
        expect(document.getElementById("component-type-matrix")!.textContent).toBe("Matrise");
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

        const withData = document.getElementById("component-custom-table-eiendom")!;
        expect(withData.querySelector(".component-example-markup-title")).not.toBeNull();
        expect(withData.querySelector(".component-example-data-title")).not.toBeNull();
        expect(withData.querySelector(".component-example-resources-title")).not.toBeNull();

        // No data or resources on this one, so only the markup block should appear.
        const withoutData = document.getElementById("component-custom-table-plan")!;
        expect(withoutData.querySelector(".component-example-data-title")).toBeNull();
        expect(withoutData.querySelector(".component-example-resources-title")).toBeNull();
    });

    it("puts each copy button beside its code block's summary, not inside it, so the summary is not a control holding a control", () => {
        renderResults(someResults());

        const blocks = Array.from(document.querySelectorAll("#component-custom-table-eiendom .component-example-code-block"));
        expect(blocks).toHaveLength(3);
        for (const block of blocks) {
            const [details, button] = Array.from(block.children);
            expect(details!.tagName).toBe("DETAILS");
            expect(button!.tagName).toBe("BUTTON");
            expect(details!.querySelector("button")).toBeNull();
        }
        expect(blocks.map((block) => block.querySelector("summary")!.textContent)).toEqual(["Markup", "Data", "Resources"]);
        expect(blocks.map((block) => block.querySelector(".code-copy-button")!.getAttribute("aria-label"))).toEqual([
            "Kopier Markup som JSON",
            "Kopier Data som JSON",
            "Kopier Resources som JSON"
        ]);
    });

    it("leaves a code block open or closed when its copy button is pressed", () => {
        renderResults(someResults());
        const block = document.querySelector("#component-custom-table-eiendom .component-example-code-block")!;
        const details = block.querySelector("details")!;

        (block.querySelector(".code-copy-button") as HTMLButtonElement).click();

        expect(details.open).toBe(false);
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

        const groups = Array.from(document.querySelectorAll("nav.component-type-list > details") as NodeListOf<HTMLDetailsElement>);
        expect(groups).toHaveLength(2);
        expect(groups.map((group) => group.querySelector("summary")!.textContent)).toEqual(["Tabell", "Matrise"]);
        expect(groups.every((group) => group.open)).toBe(true);
    });

    it("records searchable text covering both the display name and the tag name", () => {
        renderSidebar(someResults());

        const first = document.querySelector("nav.component-type-list li")! as HTMLLIElement;
        expect(first.dataset.searchText).toBe("eiendom custom-table-eiendom");
    });

    it("renders the empty state hidden", () => {
        renderSidebar(someResults());

        const emptyState = document.getElementById("sidebar-empty")!;
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
    function givenAFilterableSidebar(): HTMLInputElement {
        givenAnEmptyPage();
        renderSidebar(someResults());
        setupSidebarSearch();
        return document.getElementById("sidebar-search") as HTMLInputElement;
    }

    function typeInto(input: HTMLInputElement, value: string) {
        input.value = value;
        input.dispatchEvent(new window.Event("input"));
    }

    const visibleItems = () =>
        Array.from(document.querySelectorAll("nav.component-type-list li") as NodeListOf<HTMLLIElement>).filter((item) => !item.hidden);

    it("keeps only the matching items", () => {
        const input = givenAFilterableSidebar();

        typeInto(input, "matrix");

        expect(visibleItems()).toHaveLength(1);
        expect(visibleItems()[0]!.textContent).toBe("Data");
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

        const groups = Array.from(document.querySelectorAll("nav.component-type-list > details") as NodeListOf<HTMLDetailsElement>);
        expect(groups.map((group) => group.hidden)).toEqual([true, false]);
    });

    it("shows the empty state when nothing matches", () => {
        const input = givenAFilterableSidebar();

        typeInto(input, "finnes ikke");

        expect(document.getElementById("sidebar-empty")!.hidden).toBe(false);
        expect(visibleItems()).toHaveLength(0);
    });

    it("restores everything when the query is cleared", () => {
        const input = givenAFilterableSidebar();

        typeInto(input, "matrix");
        typeInto(input, "");

        expect(visibleItems()).toHaveLength(3);
        expect(document.getElementById("sidebar-empty")!.hidden).toBe(true);
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

describe("setupMobileNav", () => {
    /** Answers matchMedia for the drawer's breakpoint, and lets a test cross it. */
    function stubBreakpoint(matches: boolean) {
        const listeners: (() => void)[] = [];
        const query = { matches, addEventListener: (_type: string, listener: () => void) => listeners.push(listener) };
        globalThis.matchMedia = (() => query) as unknown as typeof globalThis.matchMedia;
        return {
            cross(nowMatches: boolean) {
                query.matches = nowMatches;
                listeners.forEach((listener) => listener());
            }
        };
    }

    const sidebar = () => document.getElementById("sidebar")!;
    const toggle = () => document.getElementById("sidebar-toggle")!;
    const pressEscape = () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    // The page wires the drawer up once, but each test here does, and every call adds a keydown listener to the
    // document. They are removed after each test, or an earlier test's listener answers Escape before this one's.
    let addListener: ReturnType<typeof jest.spyOn>;

    afterEach(() => {
        for (const [type, listener] of addListener.mock.calls as [string, EventListener][]) {
            document.removeEventListener(type, listener);
        }
        addListener.mockRestore();
    });

    beforeEach(() => {
        addListener = jest.spyOn(document, "addEventListener");
        document.body.className = "docs";
        document.body.innerHTML = `
            <button id="sidebar-toggle" type="button" aria-expanded="false"></button>
            <div id="sidebar-backdrop"></div>
            <aside id="sidebar"><input type="search" /><a href="#component-custom-field-data">Data</a></aside>
            <button id="elsewhere" type="button"></button>`;
    });

    it("makes the closed drawer inert below the breakpoint, so its links cannot be tabbed to while off screen", () => {
        stubBreakpoint(true);
        setupMobileNav();

        expect(sidebar().hasAttribute("inert")).toBe(true);

        toggle().click();
        expect(sidebar().hasAttribute("inert")).toBe(false);
        expect(toggle().getAttribute("aria-expanded")).toBe("true");

        toggle().click();
        expect(sidebar().hasAttribute("inert")).toBe(true);
    });

    it("hands focus back to the toggle when Escape closes the drawer", () => {
        stubBreakpoint(true);
        setupMobileNav();
        toggle().click();
        (sidebar().querySelector("input") as HTMLInputElement).focus();

        pressEscape();

        expect(document.body.classList.contains("sidebar-open")).toBe(false);
        expect(sidebar().hasAttribute("inert")).toBe(true);
        expect(document.activeElement).toBe(toggle());
    });

    it("leaves focus alone when Escape is pressed with the drawer already closed", () => {
        stubBreakpoint(true);
        setupMobileNav();
        (document.getElementById("elsewhere") as HTMLButtonElement).focus();

        pressEscape();

        expect(document.activeElement).toBe(document.getElementById("elsewhere"));
    });

    it("never makes the sidebar inert above the breakpoint, where it is always on screen", () => {
        stubBreakpoint(false);
        setupMobileNav();

        expect(sidebar().hasAttribute("inert")).toBe(false);
        toggle().click();
        toggle().click();
        expect(sidebar().hasAttribute("inert")).toBe(false);
    });

    it("follows the breakpoint when the window is resized across it", () => {
        const breakpoint = stubBreakpoint(false);
        setupMobileNav();

        breakpoint.cross(true);
        expect(sidebar().hasAttribute("inert")).toBe(true);

        breakpoint.cross(false);
        expect(sidebar().hasAttribute("inert")).toBe(false);
    });

    it("leaves the sidebar as it is where there is no matchMedia, as when the page is prerendered", () => {
        globalThis.matchMedia = undefined as unknown as typeof globalThis.matchMedia;
        setupMobileNav();

        expect(sidebar().hasAttribute("inert")).toBe(false);
    });
});

describe("scrollIntoNearestView", () => {
    /** A container 100px tall at the top of the page, scrolled to 200px, and an element at the given place in it. */
    function layout(elementTop: number, elementHeight: number) {
        const container = document.createElement("div");
        const element = document.createElement("a");
        container.appendChild(element);
        container.scrollTop = 200;
        const rect = (top: number, height: number) => ({ top, bottom: top + height }) as DOMRect;
        container.getBoundingClientRect = () => rect(0, 100);
        element.getBoundingClientRect = () => rect(elementTop - (container.scrollTop - 200), elementHeight);
        return { container, element };
    }

    it("leaves the container alone when the element is already in view", () => {
        const { container, element } = layout(40, 20);
        scrollIntoNearestView(container, element);
        expect(container.scrollTop).toBe(200);
    });

    it("scrolls up just enough to show an element above the view", () => {
        const { container, element } = layout(-30, 20);
        scrollIntoNearestView(container, element);
        expect(container.scrollTop).toBe(170);
    });

    it("scrolls down just enough to show an element below the view", () => {
        const { container, element } = layout(130, 20);
        scrollIntoNearestView(container, element);
        expect(container.scrollTop).toBe(250);
    });

    it("shows the top of an element taller than the view rather than its bottom", () => {
        const { container, element } = layout(130, 300);
        scrollIntoNearestView(container, element);
        expect(container.scrollTop).toBe(330);
    });

    it("does not touch the element itself, so focus and the Tab starting point stay where they were", () => {
        const { container, element } = layout(130, 20);
        element.scrollIntoView = () => {
            throw new Error("scrollIntoView was called");
        };
        expect(() => scrollIntoNearestView(container, element)).not.toThrow();
    });
});
