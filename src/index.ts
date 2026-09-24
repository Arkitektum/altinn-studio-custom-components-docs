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

// Types
import type { ComponentExample, ComponentExampleResult, ComponentExamples, ComponentMarkup, ComponentTypeResult } from "./types.ts";
import type { DataModel } from "./data/dataModels.ts";

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
} from "./scripts/renderers.ts";
import componentExamples from "./components/index.ts";

// Data
import dataModels from "./data/dataModels.ts";
import textResources from "./data/textResources.ts";

// Stylesheets
import "./styles/main.css";
import "highlight.js/styles/vs2015.css";

hljs.registerLanguage("json", json);

/**
 * Generates a preview DOM element for a given custom component and its data.
 *
 * @param component - The component definition, which must at least name the tag to render.
 * @param data - The form data passed to the component as attributes.
 * @returns The container element wrapping the custom component preview.
 */
function getPreviewElement(component: ComponentMarkup, data: unknown): HTMLElement {
    const htmlAttributes = new CustomElementHtmlAttributes({
        ...component,
        formData: data
    });
    return addContainerElement(createCustomElement(component?.tagName, htmlAttributes));
}

/**
 * Builds a fallback preview element shown when a component example fails to render.
 *
 * @param tagName - The tag name of the component that failed.
 * @param error - The error thrown while building the preview.
 * @returns A container element describing the failure.
 */
function getErrorPreviewElement(tagName: string, error: unknown): HTMLElement {
    const element = document.createElement("div");
    element.classList.add("component-example-error");
    element.textContent = `Failed to render <${tagName}>: ${error instanceof Error ? error.message : error}`;
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
export function getResults(componentExamples: ComponentExamples, dataModels: DataModel[]): ComponentTypeResult[] {
    const resultsElements = Object.keys(componentExamples)
        .map((componentType) => {
            // Every key came from this object, so the lookup finds something; the fallback is only for the type.
            const componentsInType = componentExamples[componentType] ?? {};
            const components = Object.keys(componentsInType)
                .map((componentKey): ComponentExampleResult | undefined => {
                    const component: ComponentExample | undefined = componentsInType[componentKey];
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
                .filter((component) => component !== undefined);
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
    // Syntax highlighting is presentation only and roughly triples the size of every code block, so it is skipped
    // while prerendering. The client highlights the prerendered blocks when it renders over them.
    if (!globalThis.__PRERENDERING__) {
        hljs.highlightAll();
    }
    setupScrollSpy();
    setupSidebarSearch();
    setupMobileNav();
    setupThemeToggle();
    setupBackToTop();
    scrollToHash();
};
