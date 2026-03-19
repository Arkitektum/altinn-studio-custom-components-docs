const markup = {
    id: "custom-table-plan",
    type: "Custom",
    tagName: "custom-table-plan",
    hideIfEmpty: false,
    hideTitle: false,
    size: "h2",
    dataModelBindings: {
        data: "customTable.plan"
    }
};

const defaultResourceBindings = {
    navn: {
        title: `resource.planer.andrePlaner.plan.navn.title`,
        emptyFieldText: "resource.emptyFieldText.default"
    },
    plantype: {
        title: `resource.planer.andrePlaner.plan.plantype.title`,
        emptyFieldText: "resource.emptyFieldText.default"
    },
    title: "resource.planer.andrePlaner.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
