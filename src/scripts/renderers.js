// Dependencies
import { appendChildren, hasValue } from "@arkitektum/altinn-studio-custom-components-utils";

// Global functions
import { getComponentNameFromTagName, getComponentTypeNameFromKey } from "./helpers.js";

// Assets
import iconBrick from "../assets/svg/brick.svg";
import iconCodeBlocks from "../assets/svg/code-blocks.svg";
import iconDataObject from "../assets/svg/data-object.svg";
import iconDictionary from "../assets/svg/dictionary.svg";

/**
 * Copies text to the clipboard, resolving to whether the copy succeeded.
 *
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} Whether the clipboard write succeeded.
 */
async function copyText(text) {
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
 * brief feedback. Clicks are prevented from toggling the surrounding <details>.
 *
 * @param {string} label - Section label, used for the accessible name.
 * @param {string} text - The text copied to the clipboard.
 * @returns {HTMLButtonElement} The copy button.
 */
function createCopyButton(label, text) {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("code-copy-button");
    button.textContent = "Kopier";
    button.setAttribute("aria-label", `Kopier ${label} som JSON`);

    let resetTimer;
    button.addEventListener("click", async (event) => {
        // Keep the click from toggling the surrounding <details>.
        event.preventDefault();
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
 * @param {Object} options - The section configuration.
 * @param {string} options.title - The summary label.
 * @param {string} options.icon - The summary icon source.
 * @param {string} options.titleClassName - Modifier class applied to the summary.
 * @param {any} options.value - The value serialized into the code block.
 * @returns {HTMLDetailsElement} The <details> element containing the code block.
 */
function renderCodeBlock({ title, icon, titleClassName, value }) {
    const jsonString = JSON.stringify(value, null, 2);

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
    titleElement.appendChild(createCopyButton(title, jsonString));
    containerElement.appendChild(titleElement);

    const codeElement = document.createElement("pre");
    const codeContentElement = document.createElement("code");
    codeContentElement.classList.add("language-json");
    codeContentElement.textContent = jsonString;
    codeElement.appendChild(codeContentElement);
    containerElement.appendChild(codeElement);

    return containerElement;
}

/**
 * Creates a container div element and appends the provided component example's element as its child.
 *
 * @param {Object} componentExample - The example object containing the element to preview.
 * @param {HTMLElement} componentExample.element - The HTML element to be rendered inside the preview container.
 * @returns {HTMLDivElement} The container div element with the preview element appended.
 */
function renderPreviewElement(componentExample) {
    const containerElement = document.createElement("div");
    containerElement.classList.add("component-example-preview");

    const previewElement = componentExample?.element;
    containerElement.appendChild(previewElement);

    return containerElement;
}

/**
 * Renders a component example, including its title, preview, markup, data, and resources.
 *
 * @param {Object} componentExample - The component example object to render.
 * @param {Object} [componentExample.markup] - The markup information for the component.
 * @param {string} [componentExample.markup.tagName] - The tag name of the component.
 * @param {Object} [componentExample.data] - The data associated with the component example.
 * @param {Object} [componentExample.resources] - The resources related to the component example.
 * @returns {HTMLDivElement} The container element with the rendered component example.
 */
function renderComponentExample(componentExample) {
    const containerElement = document.createElement("div");
    containerElement.id = `component-${componentExample?.markup?.tagName}`;
    containerElement.classList.add("component-example");
    if (componentExample?.options?.pageOrientation === "landscape") {
        containerElement.classList.add("orientation-landscape");
    } else {
        containerElement.classList.add("orientation-portrait");
    }

    const titleElement = document.createElement("h3");
    titleElement.textContent = getComponentNameFromTagName(componentExample?.markup?.tagName);
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
 * @param {Array<Object>} results - An array of component type objects to render.
 * @param {string} results[].type - The name of the component type.
 * @param {Array<Object>} results[].components - An array of component example objects for the type.
 *
 * Each component example object is rendered using the `renderComponentExample` function.
 * The rendered elements are appended to the container with the ID "component-docs-container".
 */
export function renderResults(results) {
    const containerElement = document.getElementById("component-docs-container");
    containerElement.innerHTML = "";
    const resultElements = results.map((componentType) => {
        const typeContainerElement = document.createElement("div");
        typeContainerElement.classList.add("component-type-section");

        const typeTitleElement = document.createElement("h2");
        typeTitleElement.id = `component-type-${componentType.type}`;
        typeTitleElement.textContent = getComponentTypeNameFromKey(componentType?.type);
        typeContainerElement.appendChild(typeTitleElement);

        const componentsContainerElement = document.createElement("div");
        componentsContainerElement.classList.add("components-container");

        const componentElements = componentType.components.map((componentExample) => {
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
 * @param {Array<Object>} results - An array of component type objects.
 * @param {string} results[].type - The name of the component type.
 * @param {Array<Object>} results[].components - An array of component example objects.
 * @param {Object} results[].components[].markup - The markup object for the component example.
 * @param {string} results[].components[].markup.tagName - The tag name of the component example.
 *
 * @returns {void}
 */
export function renderSidebar(results) {
    const sidebarElement = document.getElementById("sidebar");
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

    results.forEach((componentType) => {
        const typeDetailsElement = document.createElement("details");
        typeDetailsElement.open = true;
        const typeTitleElement = document.createElement("summary");
        typeTitleElement.textContent = getComponentTypeNameFromKey(componentType?.type);
        typeDetailsElement.appendChild(typeTitleElement);

        const componentsUlElement = document.createElement("ul");
        componentsUlElement.classList.add("component-list");

        componentType.components.forEach((componentExample) => {
            const tagName = componentExample?.markup?.tagName;
            const componentName = getComponentNameFromTagName(tagName);
            const componentLiElement = document.createElement("li");
            componentLiElement.dataset.searchText = `${componentName} ${tagName ?? ""}`.toLowerCase();
            const componentLinkElement = document.createElement("a");
            const iconElement = document.createElement("img");
            iconElement.src = iconBrick;
            iconElement.alt = "";
            iconElement.classList.add("component-icon");
            componentLinkElement.textContent = componentName;
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
    const input = document.getElementById("sidebar-search");
    const nav = document.querySelector("nav.component-type-list");
    if (!input || !nav) {
        return;
    }

    const groups = Array.from(nav.querySelectorAll(":scope > details"));
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
        const active = document.activeElement;
        const isTyping = active?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(active?.tagName);
        if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !isTyping) {
            event.preventDefault();
            input.focus();
            input.select();
        }
    });
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
    const links = Array.from(document.querySelectorAll("nav.component-type-list a[href^='#component-']"));
    if (!scrollContainer || !links.length || typeof IntersectionObserver === "undefined") {
        return;
    }

    const linkBySection = new Map();
    const sections = [];
    links.forEach((link) => {
        const sectionId = decodeURIComponent(link.getAttribute("href").slice(1));
        const section = document.getElementById(sectionId);
        if (section) {
            linkBySection.set(section, link);
            sections.push(section);
        }
    });

    let activeLink = null;
    let activeSummary = null;
    const setActive = (link) => {
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
        activeLink.scrollIntoView({ block: "nearest" });
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
    let unlockTimer = null;
    const syncFromScroll = () => {
        if (!clickLocked) {
            setActive(linkBySection.get(sectionAtScrollLine()));
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

    const setOpen = (open) => {
        document.body.classList.toggle("sidebar-open", open);
        toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => {
        setOpen(!document.body.classList.contains("sidebar-open"));
    });
    backdrop.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setOpen(false);
        }
    });
    // Close the drawer once a component is chosen from the menu.
    sidebar.addEventListener("click", (event) => {
        if (event.target.closest("a[href^='#component-']")) {
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
    const apply = (theme) => {
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
