const markup = {
    id: "customField-data",
    type: "Custom",
    tagName: "custom-field-data",
    hideTitle: false,
    hideIfEmpty: false,
    inline: false,
    enableLinks: false,
    dataModelBindings: {
        simpleBinding: "customField.data"
    },
    resourceBindings: {
        title: "resource.customField.data.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

export default { markup };
