const markup = {
    id: "customField-adresse",
    type: "Custom",
    tagName: "custom-field-adresse",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customField.adresse"
    },
    resourceBindings: {
        title: "resource.eiendom.adresse.title",
        emptyFieldText: "resource.emptyFieldText.address"
    }
};

const defaultResourceBindings = {
    title: "resource.eiendom.adresse.title",
    emptyFieldText: "resource.emptyFieldText.address"
};

export default { markup, defaultResourceBindings };
