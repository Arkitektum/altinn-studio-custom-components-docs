// Dependencies
import { appendChildren, hasValue } from "@arkitektum/altinn-studio-custom-components-utils";

// Global functions
import type { ComponentExampleResult, ComponentTypeResult } from "../types.ts";
import { getComponentNameFromTagName, getComponentTypeNameFromKey } from "./helpers.ts";

// Assets
import iconBrick from "../assets/svg/brick.svg";
import iconCodeBlocks from "../assets/svg/code-blocks.svg";
import iconDataObject from "../assets/svg/data-object.svg";
import iconDictionary from "../assets/svg/dictionary.svg";

/**
 * The element the gallery renders into.
 *
 * These containers ship with the page, so one missing means the page was built wrong. Saying which one is missing
 * beats the "cannot set properties of null" this used to fail with.
 *
 * @param id - The id of the container.
 * @returns The element.
 * @throws If the page does not contain it.
 */
function requireElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`The gallery cannot render without #${id} in the page`);
    }
    return element;
}

/**
 * Copies text to the clipboard, resolving to whether the copy succeeded.
 *
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} Whether the clipboard write succeeded.
 */
async function copyText(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Clipboard API unavailable (e.g. insecure context) or denied.
        return false;
    }
}

/**
 * Creates a "Copy" button that writes the given text to the clipboard and shows
 * brief feedback.
 *
 * @param label - Section label, used for the accessible name.
 * @param text - The text copied to the clipboard.
 * @returns The copy button.
 */
function createCopyButton(label: string, text: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("code-copy-button");
    button.textContent = "Kopier";
    button.setAttribute("aria-label", `Kopier ${label} som JSON`);

    let resetTimer: number | undefined;
    button.addEventListener("click", async () => {
        const copied = await copyText(text);
        button.textContent = copied ? "Kopiert" : "Feilet";
        button.classList.toggle("is-copied", copied);
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
            button.textContent = "Kopier";
            button.classList.remove("is-copied");
        }, 1500);
    });

    return button;
}

/**
 * Renders a collapsible code section (Markup, Data, or Resources) that shows a
 * value as formatted JSON inside a <details> element, with a copy button.
 *
 * The button sits beside the <details> rather than in its <summary>, and is placed over the summary bar by CSS. A
 * <summary> is a button to assistive technology, so a button inside it was a control nested in a control, and its
 * label was read as part of the summary's name ("Markup Kopier Markup som JSON"). It cannot go inside the <details>
 * either, since everything there but the summary is hidden while the section is closed.
 *
 * @param options - The section configuration.
 * @returns A wrapper holding the <details> element and its copy button.
 */
function renderCodeBlock({
    title,
    icon,
    titleClassName,
    value
}: {
    /** The summary label. */
    title: string;
    /** The summary icon source. */
    icon: string;
    /** Modifier class applied to the summary. */
    titleClassName: string;
    /** The value serialized into the code block. */
    value: unknown;
}): HTMLDivElement {
    const jsonString = JSON.stringify(value, null, 2);

    const blockElement = document.createElement("div");
    blockElement.classList.add("component-example-code-block");

    const containerElement = document.createElement("details");
    containerElement.classList.add("component-example-code");

    const titleElement = document.createElement("summary");
    titleElement.classList.add(titleClassName);
    const iconElement = document.createElement("img");
    iconElement.src = icon;
    iconElement.alt = "";
    iconElement.classList.add("summary-icon");
    titleElement.textContent = title;
    titleElement.prepend(iconElement);
    containerElement.appendChild(titleElement);

    const codeElement = document.createElement("pre");
    const codeContentElement = document.createElement("code");
    codeContentElement.classList.add("language-json");
    codeContentElement.textContent = jsonString;
    codeElement.appendChild(codeContentElement);
    containerElement.appendChild(codeElement);

    blockElement.appendChild(containerElement);
    blockElement.appendChild(createCopyButton(title, jsonString));
    return blockElement;
}

/**
 * Creates a container div element and appends the provided component example's element as its child.
 *
 * @param componentExample - The example whose rendered element is previewed.
 * @returns The container div element with the preview element appended.
 */
function renderPreviewElement(componentExample: ComponentExampleResult): HTMLDivElement {
    const containerElement = document.createElement("div");
    containerElement.classList.add("component-example-preview");

    const previewElement = componentExample?.element;
    containerElement.appendChild(previewElement);

    return containerElement;
}

/**
 * Renders a component example, including its title, preview, markup, data, and resources.
 *
 * @param componentExample - The component example object to render.
 * @returns The container element with the rendered component example.
 */
function renderComponentExample(componentExample: ComponentExampleResult): HTMLDivElement {
    const containerElement = document.createElement("div");
    containerElement.id = `component-${componentExample?.markup?.tagName}`;
    containerElement.classList.add("component-example");
    if (componentExample?.options?.pageOrientation === "landscape") {
        containerElement.classList.add("orientation-landscape");
    } else {
        containerElement.classList.add("orientation-portrait");
    }

    const titleElement = document.createElement("h3");
    titleElement.textContent = getComponentNameFromTagName(componentExample?.markup?.tagName) ?? "";
    containerElement.appendChild(titleElement);

    const previewElement = renderPreviewElement(componentExample);
    containerElement.appendChild(previewElement);

    const markupElement = renderCodeBlock({
        title: "Markup",
        icon: iconCodeBlocks,
        titleClassName: "component-example-markup-title",
        value: componentExample?.markup
    });
    containerElement.appendChild(markupElement);

    const componentExampleData = componentExample?.data;
    if (hasValue(componentExampleData)) {
        const dataElement = renderCodeBlock({
            title: "Data",
            icon: iconDataObject,
            titleClassName: "component-example-data-title",
            value: componentExampleData
        });
        containerElement.appendChild(dataElement);
    }

    const componentExampleResources = componentExample?.resources;
    if (hasValue(componentExampleResources)) {
        const resourcesElement = renderCodeBlock({
            title: "Resources",
            icon: iconDictionary,
            titleClassName: "component-example-resources-title",
            value: componentExampleResources
        });
        containerElement.appendChild(resourcesElement);
    }

    return containerElement;
}

/**
 * Renders the given results into the component documentation container.
 *
 * Each component example object is rendered using the `renderComponentExample` function.
 * The rendered elements are appended to the container with the ID "component-docs-container".
 *
 * @param results - The rendered examples, grouped by kind of component.
 */
export function renderResults(results: ComponentTypeResult[]): void {
    const containerElement = requireElement("component-docs-container");
    containerElement.innerHTML = "";
    const resultElements = results.map((componentType: ComponentTypeResult) => {
        const typeContainerElement = document.createElement("div");
        typeContainerElement.classList.add("component-type-section");

        const typeTitleElement = document.createElement("h2");
        typeTitleElement.id = `component-type-${componentType.type}`;
        typeTitleElement.textContent = getComponentTypeNameFromKey(componentType?.type) ?? "";
        typeContainerElement.appendChild(typeTitleElement);

        const componentsContainerElement = document.createElement("div");
        componentsContainerElement.classList.add("components-container");

        const componentElements = componentType.components.map((componentExample: ComponentExampleResult) => {
            return renderComponentExample(componentExample);
        });

        appendChildren(componentsContainerElement, componentElements);
        typeContainerElement.appendChild(componentsContainerElement);

        return typeContainerElement;
    });

    appendChildren(containerElement, resultElements);
}

/**
 * Renders the sidebar navigation for component types and their examples.
 *
 * @param results - The rendered examples, grouped by kind of component.
 */
export function renderSidebar(results: ComponentTypeResult[]): void {
    const sidebarElement = requireElement("sidebar");
    // Cleared first so rendering twice replaces the sidebar rather than appending a second copy, which is what
    // happens when the client hydrates a prerendered page.
    sidebarElement.innerHTML = "";
    const sidebarTitleElement = document.createElement("h2");
    sidebarTitleElement.classList.add("sidebar-title");
    sidebarTitleElement.textContent = "Komponenter";
    sidebarElement.appendChild(sidebarTitleElement);

    const searchWrapElement = document.createElement("div");
    searchWrapElement.classList.add("sidebar-search-wrap");
    const searchElement = document.createElement("input");
    searchElement.type = "search";
    searchElement.id = "sidebar-search";
    searchElement.classList.add("sidebar-search");
    searchElement.placeholder = "Filtrer komponenter…";
    searchElement.setAttribute("aria-label", "Filtrer komponenter");
    const searchHintElement = document.createElement("kbd");
    searchHintElement.classList.add("sidebar-search-kbd");
    searchHintElement.setAttribute("aria-hidden", "true");
    searchHintElement.textContent = "/";
    searchWrapElement.appendChild(searchElement);
    searchWrapElement.appendChild(searchHintElement);
    sidebarElement.appendChild(searchWrapElement);

    const navElement = document.createElement("nav");

    navElement.classList.add("component-type-list");

    results.forEach((componentType: ComponentTypeResult) => {
        const typeDetailsElement = document.createElement("details");
        typeDetailsElement.open = true;
        const typeTitleElement = document.createElement("summary");
        typeTitleElement.textContent = getComponentTypeNameFromKey(componentType?.type) ?? "";
        typeDetailsElement.appendChild(typeTitleElement);

        const componentsUlElement = document.createElement("ul");
        componentsUlElement.classList.add("component-list");

        componentType.components.forEach((componentExample: ComponentExampleResult) => {
            const tagName = componentExample?.markup?.tagName;
            const componentName = getComponentNameFromTagName(tagName);
            const componentLiElement = document.createElement("li");
            componentLiElement.dataset.searchText = `${componentName} ${tagName ?? ""}`.toLowerCase();
            const componentLinkElement = document.createElement("a");
            const iconElement = document.createElement("img");
            iconElement.src = iconBrick;
            iconElement.alt = "";
            iconElement.classList.add("component-icon");
            componentLinkElement.textContent = componentName ?? "";
            componentLinkElement.prepend(iconElement);
            componentLinkElement.href = `#component-${tagName}`;
            componentLiElement.appendChild(componentLinkElement);
            componentsUlElement.appendChild(componentLiElement);
        });

        typeDetailsElement.appendChild(componentsUlElement);
        navElement.appendChild(typeDetailsElement);
    });

    const emptyStateElement = document.createElement("p");
    emptyStateElement.id = "sidebar-empty";
    emptyStateElement.classList.add("sidebar-empty");
    emptyStateElement.textContent = "Ingen komponenter samsvarer med søket.";
    emptyStateElement.hidden = true;
    navElement.appendChild(emptyStateElement);

    sidebarElement.appendChild(navElement);
}

/**
 * Wires up the sidebar filter input.
 *
 * Filters the component links by name/tag as the user types, hides component
 * groups with no matches, expands groups while a query is active so matches are
 * visible, and toggles an empty-state message when nothing matches.
 *
 * No-ops when the search input or nav is unavailable.
 *
 * @returns {void}
 */
export function setupSidebarSearch() {
    const input = document.getElementById("sidebar-search") as HTMLInputElement | null;
    const nav = document.querySelector("nav.component-type-list");
    if (!input || !nav) {
        return;
    }

    const groups = Array.from(nav.querySelectorAll(":scope > details") as NodeListOf<HTMLDetailsElement>);
    const emptyState = document.getElementById("sidebar-empty");

    const applyFilter = () => {
        const query = input.value.trim().toLowerCase();
        let anyVisible = false;
        groups.forEach((group) => {
            let groupHasMatch = false;
            group.querySelectorAll("li").forEach((item) => {
                const isMatch = !query || (item.dataset.searchText ?? "").includes(query);
                item.hidden = !isMatch;
                groupHasMatch = groupHasMatch || isMatch;
            });
            group.hidden = !groupHasMatch;
            anyVisible = anyVisible || groupHasMatch;
            // Expand matching groups while filtering so the hits are visible.
            if (query) {
                group.open = true;
            }
        });
        if (emptyState) {
            emptyState.hidden = anyVisible;
        }
    };

    input.addEventListener("input", applyFilter);

    // Escape clears the filter while the field is focused.
    input.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            input.value = "";
            applyFilter();
            input.blur();
        }
    });

    // "/" focuses the filter from anywhere, unless the user is already typing.
    document.addEventListener("keydown", (event) => {
        const active = document.activeElement as HTMLElement | null;
        const isTyping = active?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(active?.tagName ?? "");
        if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !isTyping) {
            event.preventDefault();
            input.focus();
            input.select();
        }
    });
}

/**
 * Scrolls a container just enough to show an element inside it, the way `scrollIntoView({ block: "nearest" })` would.
 *
 * Done by hand because Chrome moves the point that Tab continues from to whatever `scrollIntoView` was called on. The
 * scroll-spy runs on every scroll, so a keyboard user who had scrolled the content found Tab jumping into the sidebar
 * just after the highlighted link, and the skip link out of reach. Setting the container's scroll position moves
 * nothing but the scroll position.
 *
 * @param {Element} container - The scrolling element.
 * @param {Element} element - The element to bring into view, a descendant of the container.
 * @returns {void}
 */
export function scrollIntoNearestView(container: Element, element: Element) {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    if (elementRect.top < containerRect.top) {
        container.scrollTop -= containerRect.top - elementRect.top;
    } else if (elementRect.bottom > containerRect.bottom) {
        container.scrollTop += Math.min(elementRect.bottom - containerRect.bottom, elementRect.top - containerRect.top);
    }
}

/**
 * Wires up scroll-spy so the sidebar reflects the component currently in view.
 *
 * Observes every rendered component section within the main scroll container
 * and, as the user scrolls, marks the matching sidebar link as active, tags its
 * component-type group, opens that group if collapsed, and keeps the active link
 * visible within the nav. This complements click navigation, which scrolls from
 * the menu to the content, by mirroring the scroll position back into the menu.
 *
 * No-ops when the required elements or IntersectionObserver are unavailable.
 *
 * @returns {void}
 */
export function setupScrollSpy() {
    const scrollContainer = document.querySelector(".page-container");
    const links = Array.from(document.querySelectorAll("nav.component-type-list a[href^='#component-']") as NodeListOf<HTMLAnchorElement>);
    if (!scrollContainer || !links.length || typeof IntersectionObserver === "undefined") {
        return;
    }

    const linkBySection: Map<Element, HTMLAnchorElement> = new Map();
    const sections: HTMLElement[] = [];
    links.forEach((link) => {
        const sectionId = decodeURIComponent(link.getAttribute("href")?.slice(1) ?? "");
        const section = document.getElementById(sectionId);
        if (section) {
            linkBySection.set(section, link);
            sections.push(section);
        }
    });

    let activeLink: HTMLAnchorElement | null = null;
    let activeSummary: Element | null = null;
    const setActive = (link: HTMLAnchorElement | undefined) => {
        if (!link || link === activeLink) {
            return;
        }
        activeLink?.classList.remove("active");
        activeSummary?.classList.remove("active-group");
        activeLink = link;
        activeLink.classList.add("active");
        const parentDetails = activeLink.closest("details");
        if (parentDetails) {
            parentDetails.open = true;
        }
        activeSummary = parentDetails?.querySelector(":scope > summary") ?? null;
        activeSummary?.classList.add("active-group");
        const nav = activeLink.closest("nav.component-type-list");
        if (nav) {
            scrollIntoNearestView(nav, activeLink);
        }
    };

    // Sections stack in document (and sidebar) order, so the one being read is
    // the last whose top has passed a line a short way down the scroll area.
    // Measuring against that line ignores sections that have scrolled off the
    // top, which is what previously caused the wrong item to be selected.
    const sectionAtScrollLine = () => {
        const line = scrollContainer.getBoundingClientRect().top + scrollContainer.clientHeight * 0.25;
        let current = sections[0];
        for (const section of sections) {
            if (section.getBoundingClientRect().top <= line) {
                current = section;
            } else {
                break;
            }
        }
        return current;
    };

    // A clicked link stays authoritative until its smooth scroll settles, so
    // intermediate scroll positions can't briefly select a neighbouring item.
    let clickLocked = false;
    let unlockTimer: number | null = null;
    const syncFromScroll = () => {
        if (!clickLocked) {
            const section = sectionAtScrollLine();
            setActive(section && linkBySection.get(section));
        }
    };
    const unlock = () => {
        clickLocked = false;
        if (unlockTimer !== null) {
            clearTimeout(unlockTimer);
            unlockTimer = null;
        }
        syncFromScroll();
    };

    const observer = new IntersectionObserver(syncFromScroll, {
        root: scrollContainer,
        // A thin band ~25% down the scroll area, so the observer fires as a
        // section boundary crosses the line that sectionAtScrollLine() measures.
        rootMargin: "-25% 0px -74% 0px",
        threshold: 0
    });
    sections.forEach((section) => observer.observe(section));

    scrollContainer.addEventListener("scrollend", unlock);
    links.forEach((link) => {
        link.addEventListener("click", () => {
            clickLocked = true;
            setActive(link);
            // Fallback in case scrollend never fires (unsupported, or no scroll).
            if (unlockTimer !== null) {
                clearTimeout(unlockTimer);
            }
            unlockTimer = setTimeout(unlock, 800);
        });
    });
}

/**
 * Wires up the mobile navigation drawer.
 *
 * Below the responsive breakpoint the sidebar is an off-canvas drawer toggled by
 * the hamburger button. This opens/closes it via a class on <body>, keeps the
 * button's aria-expanded state in sync, and closes it on backdrop click, the
 * Escape key, or after a component is chosen from the menu.
 *
 * A closed drawer is only moved off screen, so it is also made inert: otherwise a keyboard or screen reader user
 * tabs through the search field and every link in a menu they cannot see. That applies below the breakpoint only,
 * where the sidebar is a drawer at all. Closing with Escape hands focus back to the toggle.
 *
 * No-ops when the toggle, backdrop, or sidebar elements are unavailable.
 *
 * @returns {void}
 */
export function setupMobileNav() {
    const toggle = document.getElementById("sidebar-toggle");
    const backdrop = document.getElementById("sidebar-backdrop");
    const sidebar = document.getElementById("sidebar");
    if (!toggle || !backdrop || !sidebar) {
        return;
    }

    // The same breakpoint as the drawer's @media rule in main.css. Absent when prerendering, where jsdom has no
    // matchMedia, so the shipped markup carries no inert and the page sets it once it loads.
    const drawerQuery = typeof globalThis.matchMedia === "function" ? globalThis.matchMedia("(max-width: 900px)") : null;
    const isOpen = () => document.body.classList.contains("sidebar-open");

    const setOpen = (open: boolean) => {
        document.body.classList.toggle("sidebar-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        sidebar.toggleAttribute("inert", Boolean(drawerQuery?.matches) && !open);
    };

    setOpen(isOpen());
    // Crossing the breakpoint turns the drawer into the always-visible sidebar and back.
    drawerQuery?.addEventListener("change", () => setOpen(isOpen()));

    toggle.addEventListener("click", () => {
        setOpen(!isOpen());
    });
    backdrop.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            setOpen(false);
            // Focus may have been inside the drawer, which is now inert, so put it somewhere the user can act from.
            toggle.focus();
        }
    });
    // Close the drawer once a component is chosen from the menu.
    sidebar.addEventListener("click", (event) => {
        if ((event.target as Element | null)?.closest("a[href^='#component-']")) {
            setOpen(false);
        }
    });
}

/**
 * Wires up the light/dark theme toggle.
 *
 * The initial theme is applied by an inline script in the document head to
 * avoid a flash of the wrong theme, so this only reflects the current theme on
 * the button and flips it on click, persisting the choice to localStorage.
 *
 * No-ops when the toggle button is unavailable.
 *
 * @returns {void}
 */
export function setupThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) {
        return;
    }

    const root = document.documentElement;
    const apply = (theme: "light" | "dark") => {
        root.dataset.theme = theme;
        toggle.setAttribute("aria-label", theme === "dark" ? "Bytt til lyst tema" : "Bytt til mørkt tema");
        toggle.setAttribute("aria-pressed", String(theme === "dark"));
    };

    apply(root.dataset.theme === "dark" ? "dark" : "light");
    toggle.addEventListener("click", () => {
        const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
        apply(nextTheme);
        try {
            localStorage.setItem("theme", nextTheme);
        } catch {
            // Ignore storage failures (e.g. private mode); the theme still applies.
        }
    });
}

/**
 * Wires up the back-to-top button.
 *
 * Shows the button once the main content is scrolled past a threshold and
 * scrolls the content back to the top on click. Scrolling defers to the
 * container's CSS scroll-behavior, so it respects reduced-motion preferences.
 *
 * No-ops when the button or scroll container is unavailable.
 *
 * @returns {void}
 */
export function setupBackToTop() {
    const button = document.getElementById("back-to-top");
    const scrollContainer = document.querySelector(".page-container");
    if (!button || !scrollContainer) {
        return;
    }

    const toggleVisibility = () => {
        button.hidden = scrollContainer.scrollTop < 400;
    };
    toggleVisibility();
    scrollContainer.addEventListener("scroll", toggleVisibility, { passive: true });
    button.addEventListener("click", () => {
        scrollContainer.scrollTo({ top: 0 });
    });
}

/**
 * Scrolls to the component named in the current URL hash, if any.
 *
 * The gallery is rendered during window load — after the browser's own attempt
 * to scroll to a hash target — so deep links (e.g. #component-custom-field-data)
 * would otherwise land at the top. Call this once after rendering. The jump is
 * instant to avoid a long animated scroll on load; the scroll-spy then reflects
 * the active component.
 *
 * @returns {void}
 */
export function scrollToHash() {
    const { hash } = window.location;
    if (hash.length < 2) {
        return;
    }
    let target;
    try {
        target = document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
        // Malformed hash; nothing to scroll to.
        return;
    }
    target?.scrollIntoView({ behavior: "instant", block: "start" });
}
