const markup = {
    id: "customField-boolean-data",
    type: "Custom",
    tagName: "custom-field-boolean-data",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        simpleBinding: "customField.booleanData.condition",
        trueData: "customField.booleanData.trueData",
        falseData: "customField.booleanData.falseData",
        defaultData: "customField.booleanData.defaultData"
    },
    resourceBindings: {
        title: "resource.customField.booleanData.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

export default { markup };
