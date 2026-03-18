const markup = {
    id: "custom-field-telefonnummer",
    type: "Custom",
    tagName: "custom-field-telefonnummer",
    hideTitle: true,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customField.part"
    },
    resourceBindings: {
        title: "resource.part.telefonnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

export default { markup };
