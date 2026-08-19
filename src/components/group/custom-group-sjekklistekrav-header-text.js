const markup = {
    id: "custom-group-sjekklistekrav-header-text",
    type: "Custom",
    tagName: "custom-group-sjekklistekrav-header-text",
    resourceBindings: {
        sjekklistepunkt: "resource.krav.sjekklistekrav.sjekklistepunkt.title",
        sjekklistepunktsvar: "resource.krav.sjekklistekrav.sjekklistepunksvar.title"
    }
};

// This component renders its header labels from resource bindings only, so it has no default bindings of its own.
const defaultResourceBindings = {};

export default { markup, defaultResourceBindings };
