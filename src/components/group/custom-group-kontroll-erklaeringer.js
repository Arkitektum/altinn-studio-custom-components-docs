const markup = {
    id: "custom-group-kontroll-erklaeringer",
    type: "Custom",
    tagName: "custom-group-kontroll-erklaeringer",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customGroup.kontrollErklaering"
    }
};

const defaultResourceBindings = {
    kontrollErklaeringTekst: {
        title: "resource.kontrollErklaeringTekst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    kontrollKONTROLLTekst: {
        title: "resource.kontrollKONTROLLTekst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    title: "resource.erklaering.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
