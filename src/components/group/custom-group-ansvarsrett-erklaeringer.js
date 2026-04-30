const markup = {
    id: "custom-group-ansvarsrett-erklaeringer",
    type: "Custom",
    tagName: "custom-group-ansvarsrett-erklaeringer",
    hideIfEmpty: true,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.ansvarsrettErklaering"
    }
};

const defaultResourceBindings = {
    title: "resource.erklaering.title",
    emptyFieldText: "resource.emptyFieldText.default",
    ansvarsrettErklaeringTekst: {
        title: "resource.ansvarsrettErklaeringTekst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ansvarsrettSOEKTekst: {
        title: "resource.ansvarsrettSOEKTekst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ansvarsrettPROTekst: {
        title: "resource.ansvarsrettPROTekst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ansvarsrettUTFTekst: {
        title: "resource.ansvarsrettUTFTekst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ansvarsrettKONTROLLTekst: {
        title: "resource.ansvarsrettKONTROLLTekst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

export default { markup, defaultResourceBindings };
