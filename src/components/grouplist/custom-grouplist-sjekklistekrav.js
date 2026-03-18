const markup = {
    id: "custom-grouplist-sjekklistekrav",
    type: "Custom",
    tagName: "custom-grouplist-sjekklistekrav",
    hideTitle: false,
    hideIfEmpty: false,
    size: "h2",
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
