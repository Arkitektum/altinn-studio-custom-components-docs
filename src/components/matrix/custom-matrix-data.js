// A matrix renders the first column as a row header (scope="row") and the remaining columns as values, so the example
// puts the labelling dimension first: one row per floor, one column per area figure.
const markup = {
    id: "custom-matrix-data",
    type: "Custom",
    tagName: "custom-matrix-data",
    hideTitle: false,
    hideIfEmpty: false,
    size: "h2",
    dataModelBindings: {
        data: "customMatrix.data"
    },
    tableColumns: [
        {
            dataKey: "etasje",
            tagName: "custom-field-data",
            resourceBindings: {
                title: "resource.customMatrix.data.etasje.title",
                emptyFieldText: "resource.emptyFieldText.default"
            }
        },
        {
            dataKey: "bruksareal",
            tagName: "custom-field-data",
            resourceBindings: {
                title: "resource.customMatrix.data.bruksareal.title",
                emptyFieldText: "resource.emptyFieldText.default"
            },
            styleOverride: {
                textAlign: "right"
            }
        },
        {
            dataKey: "bebygdAreal",
            tagName: "custom-field-data",
            resourceBindings: {
                title: "resource.customMatrix.data.bebygdAreal.title",
                emptyFieldText: "resource.emptyFieldText.default"
            },
            styleOverride: {
                textAlign: "right"
            }
        },
        {
            dataKey: "antallBoenheter",
            tagName: "custom-field-data",
            resourceBindings: {
                title: "resource.customMatrix.data.antallBoenheter.title",
                emptyFieldText: "resource.emptyFieldText.default"
            },
            styleOverride: {
                textAlign: "right"
            }
        }
    ],
    resourceBindings: {
        title: "resource.customMatrix.data.title",
        emptyFieldText: "resource.customMatrix.data.emptyFieldText"
    }
};

export default { markup };
