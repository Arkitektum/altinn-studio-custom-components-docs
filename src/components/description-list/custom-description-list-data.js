const markup = {
    id: "custom-description-list-data",
    type: "Custom",
    tagName: "custom-description-list-data",
    hideTitle: false,
    hideIfEmpty: false,
    itemTermKey: "event",
    itemDescriptionKey: "date",
    dataModelBindings: {
        data: "customDescriptionList.data"
    },
    resourceBindings: {
        title: "resource.customDescriptionList.data.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    styleOverride: {
        width: "250px"
    }
};

export default { markup };
