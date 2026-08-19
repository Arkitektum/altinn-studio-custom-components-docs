const markup = {
    id: "custom-group-samsvar-erklaeringer",
    type: "Custom",
    tagName: "custom-group-samsvar-erklaeringer",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customGroup.samsvarErklaering"
    }
};

const defaultResourceBindings = {
    samsvarErklaeringTekst: {
        title: "resource.samsvarErklaeringTekst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    samsvarPROTekst: {
        title: "resource.samsvarPROTekst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    samsvarUTFTekst: {
        title: "resource.samsvarUTFTekst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    title: "resource.erklaering.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
