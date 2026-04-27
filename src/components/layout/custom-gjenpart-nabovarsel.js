const markup = {
    id: "custom-gjenpart-nabovarsel",
    type: "Custom",
    tagName: "custom-gjenpart-nabovarsel",
    dataModelBindings: {
        ansvarligSoeker: "customLayout.gjenpartNabovarsel.ansvarligSoeker",
        dispensasjonOversikt: "customLayout.gjenpartNabovarsel.dispensasjonOversikt",
        eiendomByggested: "customLayout.gjenpartNabovarsel.eiendomByggested",
        kontaktpersonForNabovarselet: "customLayout.gjenpartNabovarsel.kontaktpersonForNabovarselet",
        metadata: "customLayout.gjenpartNabovarsel.metadata",
        naboGjenboerEiendommer: "customLayout.gjenpartNabovarsel.naboGjenboerEiendommer",
        planer: "customLayout.gjenpartNabovarsel.planer",
        soeknadGjelder: "customLayout.gjenpartNabovarsel.soeknadGjelder",
        tiltakshaver: "customLayout.gjenpartNabovarsel.tiltakshaver"
    }
};

const defaultResourceBindings = {
    gjenpartNabovarsel: {
        title: "resource.gjenpartNabovarsel.title",
        description: "resource.gjenpartNabovarsel.description"
    },
    naboGjenboerEiendom: {
        title: "resource.naboGjenboer.title"
    },
    metadataProsjektnavn: {
        title: "resource.metadata.prosjekt.title"
    },
    eiendomByggested: {
        title: "resource.eiendomByggested.eiendom.title"
    },
    adresse: {
        title: "resource.adresse.title",
        emptyFieldText: "resource.emptyFieldText.address"
    },
    eiendomsidentifikasjonGaardsnummer: {
        title: "resource.eiendom.eiendomsidentifikasjon.gaardsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomsidentifikasjonBruksnummer: {
        title: "resource.eiendom.eiendomsidentifikasjon.bruksnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomsidentifikasjonSeksjonsnummer: {
        title: "resource.eiendom.eiendomsidentifikasjon.seksjonsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomsidentifikasjonFestenummer: {
        title: "resource.eiendom.eiendomsidentifikasjon.festenummer.title",
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
    detErVarsletOm: {
        title: "resource.detErVarsletOm.title"
    },
    soeknadGjelderType: {
        title: "resource.soeknadGjelder.type.kode.kodebeskrivelse",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    soeknadGjelderBrukTiltaksformaal: {
        title: "resource.soeknadGjelder.bruk.tiltaksformaal.kode.kodebeskrivelse",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    soeknadGjelderBrukBeskrivPlanlagtFormaal: {
        title: "resource.soeknadGjelder.bruk.beskrivPlanlagtFormaal.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    planerGjeldendePlan: {
        title: "resource.planer.gjeldendePlan.title"
    },
    planerGjeldendePlanNavn: {
        title: "resource.planer.gjeldendePlan.navn.title"
    },
    planerGjeldendePlanPlantype: {
        title: "resource.planer.gjeldendePlan.plantype.title"
    },
    kontaktpersonForNabovarselet: {
        title: "resource.kontaktpersonForNabovarselet.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    kontaktpersonForNabovarseletNavn: {
        title: "resource.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    kontaktpersonForNabovarseletTelefonnummer: {
        title: "resource.part.telefonnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    kontaktpersonForNabovarseletEpost: {
        title: "resource.part.epost.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ansvarligSoeker: {
        title: "resource.ansvarligSoeker.title"
    },
    tiltakshaver: {
        title: "resource.tiltakshaver.title"
    },
    eiendomMatrikkelinformasjon: {
        title: "resource.naboGjenboer.eiendommer.eiendom.matrikkelinformasjon.title"
    },
    eiendomMatrikkelinformasjonAdresse: {
        title: "resource.adresse.title",
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
        title: "resource.navn.title",
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
        title: "resource.adresse.title"
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
    },
    dispensasjonOversikt: {
        title: "resource.dispensasjonOversikt.header"
    },
    dispensasjonOversiktCount: {
        title: "resource.dispensasjonOversikt.dispensasjon.count.title",
        emptyFieldText: "resource.emptyFieldText.zero"
    },
    dispensasjonKategori: {
        title: "resource.dispensasjonOversikt.dispensasjon.dispensasjonKategori.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    dispensasjonTittel: {
        title: "resource.emne.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    bestemmelserType: {
        title: "resource.dispensasjonOversikt.dispensasjon.bestemmelserType.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    rowNumber: {
        title: "resource.nummer.short"
    }
};

export default { markup, defaultResourceBindings };
