const markup = {
    id: "custom-grouplist-nabo-gjenboer-eiendom",
    type: "Custom",
    tagName: "custom-grouplist-nabo-gjenboer-eiendom",
    hideTitle: false,
    hideIfEmpty: false,
    size: "h2",
    dataModelBindings: {
        data: "customGrouplist.naboGjenboerEiendom"
    }
};

const defaultResourceBindings = {
    eiendomMatrikkelinformasjon: {
        title: "resource.naboGjenboer.eiendommer.eiendom.matrikkelinformasjon.title"
    },
    eiendomMatrikkelinformasjonAdresse: {
        title: "resource.eiendom.adresse.title",
        emptyFieldText: "resource.emptyFieldText.address"
    },
    eiendomMatrikkelinformasjonEiendomsidentifikasjonGaardsnummer: {
        title: "resource.eiendom.gaardsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomMatrikkelinformasjonEiendomsidentifikasjonBruksnummer: {
        title: "resource.eiendom.bruksnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomMatrikkelinformasjonEiendomsidentifikasjonSeksjonsnummer: {
        title: "resource.eiendom.seksjonsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomMatrikkelinformasjonEiendomsidentifikasjonFestenummer: {
        title: "resource.eiendom.festenummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomMatrikkelinformasjonBolignummer: {
        title: "resource.eiendom.bolignummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomMatrikkelinformasjonBygningsnummer: {
        title: "resource.eiendom.bygningsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eier: {
        title: "resource.eier.title"
    },
    eierNavn: {
        title: "resource.part.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eierTelefonnummer: {
        title: "resource.part.telefonnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eierEpost: {
        title: "resource.part.epost.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eierAdresse: {
        title: "resource.eiendom.adresse.title"
    },
    responsNabovarselSendtVia: {
        title: "resource.respons.nabovarselSendtVia.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    responsNabovarselSendt: {
        title: "resource.respons.nabovarselSendt.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    responsErMerknadEllerSamtykkeMottatt: {
        title: "resource.respons.erMerknadEllerSamtykkeMottatt.title",
        falseText: "resource.respons.erMerknadEllerSamtykkeMottatt.falseText"
    },
    responsErMerknadMottatt: {
        trueText: "resource.respons.erMerknadMottatt.trueText"
    },
    responsErSamtykkeMottatt: {
        trueText: "resource.respons.erSamtykkeMottatt.trueText"
    },
    responsMerknadMottattDato: {
        title: "resource.respons.merknadMottattDato.title"
    },
    responsSamtykkeMottattDato: {
        title: "resource.respons.samtykkeMottattDato.title"
    }
};

export default { markup, defaultResourceBindings };
