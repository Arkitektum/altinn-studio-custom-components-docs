const markup = {
    id: "custom-field-part-navn",
    type: "Custom",
    tagName: "custom-field-part-navn",
    hideTitle: true,
    hideIfEmpty: false,
    hideOrgNr: false,
    dataModelBindings: {
        data: "customField.part"
    },
    resourceBindings: {
        title: "resource.customField.part.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

export default { markup };
