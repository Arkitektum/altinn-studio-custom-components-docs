const markup = {
    id: "customTable-eiendom",
    type: "Custom",
    tagName: "custom-table-eiendom",
    size: "h3",
    hideIfEmpty: true,
    dataModelBindings: {
        data: "customTable.eiendom"
    },
    resourceBindings: {
        title: "resource.eiendomByggested.eiendom.title"
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
    title: "resource.eiendomByggested.eiendom.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
