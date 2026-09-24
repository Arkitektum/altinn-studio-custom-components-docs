/**
 * The shapes the gallery passes between its own parts.
 *
 * These describe how an example is written and what rendering one produces. They are not the components' own
 * types: a component decides for itself what its attributes mean, and this repository only shows it doing so.
 */

/** How a component example is written, which is the attributes the component takes plus the tag it is. */
export interface ComponentMarkup {
    /** The custom element to render. The only part every example must have. */
    tagName: string;
    id?: string;
    type?: string;
    size?: string;
    inline?: boolean;
    hideTitle?: boolean;
    hideIfEmpty?: boolean;
    hideOrgNr?: boolean;
    enableLinks?: boolean;
    itemKey?: string;
    itemTermKey?: string;
    itemDescriptionKey?: string;
    dataItemKey?: string;
    dataTitleItemKey?: string;
    /** Where in the data model each value comes from, keyed as the component names it. */
    dataModelBindings?: Record<string, string>;
    /** Which text resource each label comes from. Nested, because a table names one per column. */
    resourceBindings?: Record<string, unknown>;
    tableColumns?: unknown[];
    styleOverride?: Record<string, string>;
}

/** How one example asks to be shown, as against what it renders. */
export interface ComponentExampleOptions {
    /** Widens the preview for a component meant for a landscape page. Portrait is the default and is not written. */
    pageOrientation?: "landscape" | "portrait";
}

/** One example as its file exports it. */
export interface ComponentExample {
    markup: ComponentMarkup;
    options?: ComponentExampleOptions;
    /** Bindings applied unless the markup names its own, so an example only writes what is interesting about it. */
    defaultResourceBindings?: Record<string, unknown>;
}

/** Every example, grouped by the kind of component, as `src/components/index.js` collects them. */
export type ComponentExamples = Record<string, Record<string, ComponentExample>>;

/** One rendered example: the preview, and everything the gallery shows alongside it. */
export interface ComponentExampleResult {
    element: HTMLElement;
    markup: ComponentMarkup;
    options?: ComponentExampleOptions;
    /** The data the component was given, which is whatever its bindings reached. */
    data?: unknown;
    /** The text resources its bindings resolved to. */
    resources?: unknown;
}

/** The rendered examples for one kind of component. */
export interface ComponentTypeResult {
    type: string;
    components: ComponentExampleResult[];
}
