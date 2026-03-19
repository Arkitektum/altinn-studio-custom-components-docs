const markup = {
    id: "custom-list-vedlegg",
    type: "Custom",
    tagName: "custom-list-vedlegg",
    hideTitle: true,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customList.vedlegg"
    },
    resourceBindings: {
        title: "resource.customList.vedlegg.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

export default { markup };
