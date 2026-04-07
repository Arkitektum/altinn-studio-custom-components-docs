const markup = {
    id: "custom-table-data",
    type: "Custom",
    tagName: "custom-table-data",
    hideTitle: false,
    hideIfEmpty: false,
    size: "h2",
    dataModelBindings: {
        data: "customTable.data"
    },
    tableColumns: [
        {
            dataKey: "navn",
            tagName: "custom-field-data",
            resourceBindings: {
                title: "resource.customTable.data.navn.title",
                emptyFieldText: "resource.emptyFieldText.default"
            }
        },
        {
            dataKey: "dato",
            tagName: "custom-field-data",
            format: "date",
            resourceBindings: {
                title: "resource.customTable.data.dato.title",
                emptyFieldText: "resource.emptyFieldText.default"
            },
            styleOverride: {
                textAlign: "right"
            }
        },
        {
            dataKey: "kommentar",
            tagName: "custom-field-data",
            resourceBindings: {
                title: "resource.customTable.data.kommentar.title",
                emptyFieldText: "resource.emptyFieldText.default"
            }
        }
    ],
    resourceBindings: {
        title: "resource.customTable.data.title",
        emptyFieldText: "resource.customTable.data.emptyFieldText"
    }
};

export default { markup };
