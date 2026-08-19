const markup = {
    id: "custom-group-kontroll-ansvarsomraade",
    type: "Custom",
    tagName: "custom-group-kontroll-ansvarsomraade",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customGroup.kontrollAnsvarsomraade"
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
    ansvarsomraade: {
        title: "resource.ansvarsomraade.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    sluttrapport: {
        title: "resource.sluttrapport.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    harObserverteAvvik: {
        title: "resource.harObserverteAvvik.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    harAapneAvvik: {
        title: "resource.harAapneAvvik.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    harIngenAvvik: {
        title: "resource.harIngenAvvik.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    erDetFunnetAvvik: {
        title: "resource.erDetFunnetAvvik.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

export default { markup, defaultResourceBindings };
