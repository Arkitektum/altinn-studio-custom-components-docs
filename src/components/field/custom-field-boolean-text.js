const markup = {
    id: "customField-boolean-text",
    type: "Custom",
    tagName: "custom-field-boolean-text",
    hideTitle: true,
    hideIfEmpty: false,
    inline: false,
    dataModelBindings: {
        simpleBinding: "customField.booleanText.condition"
    },
    resourceBindings: {
        title: "resource.customField.booleanText.title"
    }
};

const defaultResourceBindings = {
    trueText: "resource.trueText.default",
    falseText: "resource.falseText.default",
    defaultText: "resource.emptyFieldText.default",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
