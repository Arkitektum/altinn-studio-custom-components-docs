const markup = {
    id: "custom-table-ansvarsrett-ansvarsomraade",
    type: "Custom",
    tagName: "custom-table-ansvarsrett-ansvarsomraade",
    size: "h2",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customTable.ansvarsrettAnsvarsomraade"
    }
};

const defaultResourceBindings = {
    funksjon: {
        title: "resource.funksjon.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    beskrivelseAvAnsvarsomraadet: {
        title: "resource.beskrivelseAvAnsvarsomraadet.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    tiltaksklasse: {
        title: "resource.tiltaksklasse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    faseSamsvarKontroll: {
        titleKontroll: "resource.faseSamsvarKontroll.titleKontroll",
        titleMix: "resource.faseSamsvarKontroll.titleMix",
        titleProUtf: "resource.faseSamsvarKontroll.titleProUtf",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    dekkesOmraadeAvSentralGodkjenning: {
        title: "resource.dekkesOmraadeAvSentralGodkjenning.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default",
        defaultText: "resource.emptyFieldText.default"
    },
    rammetillatelse: {
        title: "resource.rammesoeknad.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    igangsettingstillatelse: {
        title: "resource.igangsettingstillatelse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    midlertidigBrukstillatelse: {
        title: "resource.midlertidigBrukstillatelse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ferdigattest: {
        title: "resource.ferdigattest.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    titleSingle: "resource.ansvarsomraade.title",
    titlePlural: "resource.ansvarsomraader.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
