import type { TextResourceBundle } from "./types.ts";

declare global {
    /**
     * What the page hands the components at startup.
     *
     * The components read their labels off these rather than being passed them, because that is how an Altinn app
     * provides them at runtime and the gallery has to look the same to a component as an app does.
     */
    var textResources: TextResourceBundle;
    var defaultTextResources: TextResourceBundle;
    /** Set while the build prerenders the page, so work that only matters in a browser can be skipped. */
    var __PRERENDERING__: boolean | undefined;
}
