const markup = {
    id: "custom-grouplist-samsvar-ansvarsomraade",
    type: "Custom",
    tagName: "custom-grouplist-samsvar-ansvarsomraade",
    hideTitle: false,
    hideIfEmpty: false,
    size: "h2",
    dataModelBindings: {
        data: "customGrouplist.samsvarAnsvarsomraade"
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
    datoAnsvarsrettErklaert: {
        title: "resource.datoAnsvarsrettErklaert.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    erAnsvarsomraadetAvsluttet: {
        title: "resource.erAnsvarsomraadetAvsluttet.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default",
        defaultText: "resource.emptyFieldText.default"
    },
    avdekketArbeider: {
        title: "resource.avdekketArbeider.title",
        emptyFieldText: "resource.emptyFieldText.default"
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
    ansvarsomraade: {
        title: "resource.ansvarsomraade.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    gjenstaaendeArbeider: {
        title: "resource.gjenstaaendeArbeider.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    sikkerhetsNivaa: {
        title: "resource.sikkerhetsNivaa.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    utfoereInnen: {
        title: "resource.utfoereInnen.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    typeArbeider: {
        title: "resource.typeArbeider.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    tilstrekkeligSikkerhet: {
        title: "resource.tilstrekkeligSikkerhet.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default",
        defaultText: "resource.emptyFieldText.default"
    },
    arbeidGjenstaaendeInnenfor: {
        title: "resource.gjenstaaendeArbeider.gjenstaaendeInnenfor.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    arbeidGjenstaaendeUtenfor: {
        title: "resource.gjenstaaendeArbeider.gjenstaaendeUtenfor.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

export default { markup, defaultResourceBindings };
