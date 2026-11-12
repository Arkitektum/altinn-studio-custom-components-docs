import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-group-sjekklistekrav-header-text",
    type: "Custom",
    tagName: "custom-group-sjekklistekrav-header-text",
    resourceBindings: {
        sjekklistepunkt: "resource.krav.sjekklistekrav.sjekklistepunkt.title",
        sjekklistepunktsvar: "resource.krav.sjekklistekrav.sjekklistepunksvar.title"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
