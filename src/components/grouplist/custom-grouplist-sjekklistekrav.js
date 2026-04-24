const markup = {
    id: "custom-grouplist-sjekklistekrav",
    type: "Custom",
    tagName: "custom-grouplist-sjekklistekrav",
    hideTitle: false,
    hideIfEmpty: false,
    size: "h2",
    resourceBindings: {
        description: "resource.krav.sjekklistekrav.description",
        sjekklistepunkt: "resource.krav.sjekklistekrav.sjekklistepunkt.title",
        sjekklistepunktsvar: "resource.krav.sjekklistekrav.sjekklistepunksvar.title"
    },
    dataModelBindings: {
        data: "customGrouplist.sjekklistekrav"
    }
};

const defaultResourceBindings = {
    trueText: "resource.trueText.default",
    falseText: "resource.falseText.default",
    defaultText: "resource.emptyFieldText.default",
    title: "resource.krav.sjekklistekrav.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
