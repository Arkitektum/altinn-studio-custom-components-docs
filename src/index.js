// Altinn Studio Custom Components
import "@arkitektum/altinn-studio-custom-components/dist/main.js";
import "@arkitektum/altinn-studio-custom-components/dist/main.css";
import defaultTextResources from "@arkitektum/altinn-studio-custom-components/dist/resource.nb.json";

// Dependencies
import {
    CustomElementHtmlAttributes,
    addContainerElement,
    createCustomElement,
    getDataForComponent,
    getTextResourcesFromResourceBindings
} from "@arkitektum/altinn-studio-custom-components-utils";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

// Local functions
import {
    renderResults,
    renderSidebar,
    scrollToHash,
    setupBackToTop,
    setupMobileNav,
    setupScrollSpy,
    setupSidebarSearch,
    setupThemeToggle
} from "./scripts/renderers.js";
import componentExamples from "./components/index.js";

// Data
import dataModels from "./data/dataModels.js";
import textResources from "./data/textResources.js";

// Stylesheets
import "./styles/main.css";
import "highlight.js/styles/vs2015.css";

hljs.registerLanguage("json", json);

/**
 * Generates a preview DOM element for a given custom component and its data.
 *
 * @param {Object} component - The component definition, expected to include at least a `tagName` property.
 * @param {Object} data - The form data to be passed to the component as attributes.
 * @returns {HTMLElement} The container element wrapping the custom component preview.
 */
function getPreviewElement(component, data) {
    const htmlAttributes = new CustomElementHtmlAttributes({
        ...component,
        formData: data
    });
    return addContainerElement(createCustomElement(component?.tagName, htmlAttributes));
}

/**
 * Builds a fallback preview element shown when a component example fails to render.
 *
 * @param {string} tagName - The tag name of the component that failed.
 * @param {unknown} error - The error thrown while building the preview.
 * @returns {HTMLElement} A container element describing the failure.
 */
function getErrorPreviewElement(tagName, error) {
    const element = document.createElement("div");
    element.classList.add("component-example-error");
    element.textContent = `Failed to render <${tagName}>: ${error?.message ?? error}`;
    return element;
}

/**
 * Generates a structured list of component preview results based on provided examples and data models.
 *
 * @param {Object} componentExamples - An object containing component examples grouped by type.
 * @param {Object} dataModels - An object representing available data models for the components.
 * @returns {Array<Object>} An array of result objects, each containing:
 *   - {string} type: The component type.
 *   - {Array<Object>} components: An array of component result objects, each with:
 *       - {HTMLElement} element: The preview element for the component.
 *       - {Object} markup: The markup definition of the component.
 *       - {Object} data: The data generated for the component.
 *       - {Object} resources: The text resources associated with the component.
 */
export function getResults(componentExamples, dataModels) {
    const resultsElements = Object.keys(componentExamples)
        .map((componentType) => {
            const componentsInType = componentExamples[componentType];
            const components = Object.keys(componentsInType)
                .map((componentKey) => {
                    const component = componentsInType[componentKey];
                    const markup = component?.markup;
                    if (!markup?.tagName) {
                        return;
                    }
                    try {
                        const data = getDataForComponent(markup, dataModels);
                        return {
                            element: getPreviewElement(markup, data),
                            markup,
                            options: component?.options,
                            data,
                            resources: getTextResourcesFromResourceBindings({
                                ...component?.defaultResourceBindings,
                                ...markup?.resourceBindings
                            })
                        };
                    } catch (error) {
                        // A single broken example must not blank the whole gallery.
                        console.error(`Failed to render component "${markup.tagName}"`, error);
                        return {
                            element: getErrorPreviewElement(markup.tagName, error),
                            markup,
                            options: component?.options
                        };
                    }
                })
                // Drop examples without a valid tagName here, so no undefined holes reach renderResults.
                .filter(Boolean);
            return {
                type: componentType,
                components
            };
        })
        // Drop types with no valid examples so no empty section/heading renders.
        .filter((componentType) => componentType.components.length > 0);
    return resultsElements;
}

/**
 * Initializes the documentation page when the window has finished loading.
 *
 * Fetches default text resources, computes component results using the
 * imported `componentExamples` and `dataModels`, renders the results and
 * sidebar, and applies syntax highlighting to code blocks.
 *
 * @returns {Promise<void>} A promise that resolves when initialization is complete.
 */
globalThis.onload = async function () {
    globalThis.textResources = textResources;
    globalThis.defaultTextResources = defaultTextResources;
    const results = getResults(componentExamples, dataModels);
    renderResults(results);
    renderSidebar(results);
    hljs.highlightAll();
    setupScrollSpy();
    setupSidebarSearch();
    setupMobileNav();
    setupThemeToggle();
    setupBackToTop();
    scrollToHash();
};
