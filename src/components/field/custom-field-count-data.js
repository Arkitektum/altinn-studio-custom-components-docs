const markup = {
    id: "custom-field-count-data",
    type: "Custom",
    tagName: "custom-field-count-data",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customField.countData"
    },
    resourceBindings: {
        title: "resource.customField.countData.title",
        emptyFieldText: "resource.customField.countData.emptyFieldText"
    }
};

export default { markup };
