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
 * Renders a markup example for a component as a collapsible <details> element.
 *
 * The rendered element includes a summary titled "Markup" and a code block
 * displaying the JSON representation of the component's markup.
 *
 * @param {Object} componentExample - The example object containing markup to render.
 * @param {any} componentExample.markup - The markup data to be displayed as JSON.
 * @returns {HTMLDetailsElement} The constructed <details> element containing the markup example.
 */
function renderComponentExampleMarkup(componentExample) {
    const containerElement = document.createElement("details");
    containerElement.classList.add("component-example-code");

    const titleElement = document.createElement("summary");
    titleElement.classList.add("component-example-markup-title");
    const iconElement = document.createElement("img");
    iconElement.src = iconCodeBlocks;
    iconElement.alt = "Markup Icon";
    iconElement.classList.add("summary-icon");
    titleElement.textContent = "Markup";
    titleElement.prepend(iconElement);
    containerElement.appendChild(titleElement);

    const codeElement = document.createElement("pre");
    const codeContentElement = document.createElement("code");
    codeContentElement.classList.add("language-json");
    codeContentElement.textContent = JSON.stringify(componentExample?.markup, null, 2);
    codeElement.appendChild(codeContentElement);
    containerElement.appendChild(codeElement);

    return containerElement;
}

/**
 * Renders a collapsible details element displaying the provided component example data as formatted JSON.
 *
 * @param {Object} componentExampleData - The example data to display in the rendered component.
 * @returns {HTMLElement} The DOM element containing the formatted example data.
 */
function renderComponentExampleData(componentExampleData) {
    const containerElement = document.createElement("details");
    containerElement.classList.add("component-example-code");

    const titleElement = document.createElement("summary");
    titleElement.classList.add("component-example-data-title");
    const iconElement = document.createElement("img");
    iconElement.src = iconDataObject;
    iconElement.alt = "Data Icon";
    iconElement.classList.add("summary-icon");
    titleElement.textContent = "Data";
    titleElement.prepend(iconElement);
    containerElement.appendChild(titleElement);

    const codeElement = document.createElement("pre");
    const codeContentElement = document.createElement("code");
    codeContentElement.classList.add("language-json");
    codeContentElement.textContent = JSON.stringify(componentExampleData, null, 2);
    codeElement.appendChild(codeContentElement);
    containerElement.appendChild(codeElement);

    return containerElement;
}

/**
 * Renders a collapsible "Resources" section displaying the given component example resources as formatted JSON.
 *
 * @param {Object} componentExampleResources - The resources object to display in the code block.
 * @returns {HTMLElement} The DOM element containing the rendered resources section.
 */
function renderComponentExampleResources(componentExampleResources) {
    const containerElement = document.createElement("details");
    containerElement.classList.add("component-example-code");

    const titleElement = document.createElement("summary");
    titleElement.classList.add("component-example-resources-title");
    const iconElement = document.createElement("img");
    iconElement.src = iconDictionary;
    iconElement.alt = "Resources Icon";
    iconElement.classList.add("summary-icon");
    titleElement.textContent = "Resources";
    titleElement.prepend(iconElement);
    containerElement.appendChild(titleElement);

    const codeElement = document.createElement("pre");
    const codeContentElement = document.createElement("code");
    codeContentElement.classList.add("language-json");
    codeContentElement.textContent = JSON.stringify(componentExampleResources, null, 2);
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

    const markupElement = renderComponentExampleMarkup(componentExample);
    containerElement.appendChild(markupElement);

    const componentExampleData = componentExample?.data;
    if (hasValue(componentExampleData)) {
        const dataElement = renderComponentExampleData(componentExampleData);
        containerElement.appendChild(dataElement);
    }

    const componentExampleResources = componentExample?.resources;
    if (hasValue(componentExampleResources)) {
        const resourcesElement = renderComponentExampleResources(componentExampleResources);
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
    const sidebarTitleElement = document.createElement("h2");
    sidebarTitleElement.classList.add("sidebar-title");
    sidebarTitleElement.textContent = "Components";
    sidebarElement.appendChild(sidebarTitleElement);

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
            const componentLiElement = document.createElement("li");
            const componentLinkElement = document.createElement("a");
            const iconElement = document.createElement("img");
            iconElement.src = iconBrick;
            iconElement.alt = "Component Icon";
            iconElement.classList.add("component-icon");
            componentLinkElement.textContent = getComponentNameFromTagName(componentExample?.markup?.tagName);
            componentLinkElement.prepend(iconElement);
            componentLinkElement.href = `#component-${componentExample?.markup?.tagName}`;
            componentLiElement.appendChild(componentLinkElement);
            componentsUlElement.appendChild(componentLiElement);
        });

        typeDetailsElement.appendChild(componentsUlElement);
        navElement.appendChild(typeDetailsElement);
    });

    sidebarElement.appendChild(navElement);
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
