const markup = {
    id: "custom-table-nabo-gjenboer-eiendom",
    type: "Custom",
    tagName: "custom-table-nabo-gjenboer-eiendom",
    dataModelBindings: {
        data: "customTable.naboGjenboerEiendom"
    },
    resourceBindings: {
        title: "resource.naboGjenboer.eiendommer.eiendom.matrikkelinformasjon.title",
        emptyFieldText: "resource.naboGjenboer.eiendommer.eiendom.matrikkelinformasjon.emptyFieldText"
    }
};

const defaultResourceBindings = {
    adresse: {
        title: "resource.eiendom.adresse.title",
        emptyFieldText: "resource.emptyFieldText.address"
    },
    eiendomsidentifikasjonGaardsnummer: {
        title: "resource.eiendom.gaardsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomsidentifikasjonBruksnummer: {
        title: "resource.eiendom.bruksnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomsidentifikasjonSeksjonsnummer: {
        title: "resource.eiendom.seksjonsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomsidentifikasjonFestenummer: {
        title: "resource.eiendom.festenummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    bolignummer: {
        title: "resource.eiendom.bolignummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    bygningsnummer: {
        title: "resource.eiendom.bygningsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    title: "resource.naboGjenboer.eiendommer.eiendom.matrikkelinformasjon.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
