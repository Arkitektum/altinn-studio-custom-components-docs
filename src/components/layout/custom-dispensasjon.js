const markup = {
    id: "custom-dispensasjon",
    type: "Custom",
    tagName: "custom-dispensasjon",
    dataModelBindings: {
        begrunnelse: "customLayout.dispensasjon.begrunnelse",
        bestemmelsestype: "customLayout.dispensasjon.bestemmelsestype",
        dispensasjonsbeskrivelse: "customLayout.dispensasjon.dispensasjonsbeskrivelse",
        dispensasjonsreferanse: "customLayout.dispensasjon.dispensasjonsreferanse",
        dispensasjonstema: "customLayout.dispensasjon.dispensasjonstema",
        eiendomByggested: "customLayout.dispensasjon.eiendomByggested",
        generelleVilkaar: "customLayout.dispensasjon.generelleVilkaar",
        kommunensSaksnummer: "customLayout.dispensasjon.kommunensSaksnummer",
        metadata: "customLayout.dispensasjon.metadata",
        nasjonalArealplanId: "customLayout.dispensasjon.nasjonalArealplanId",
        paragrafnummer: "customLayout.dispensasjon.paragrafnummer",
        plannavn: "customLayout.dispensasjon.plannavn",
        stedfesting: "customLayout.dispensasjon.stedfesting",
        tiltakshaver: "customLayout.dispensasjon.tiltakshaver",
        tiltakstyper: "customLayout.dispensasjon.tiltakstyper",
        varighet: "customLayout.dispensasjon.varighet"
    }
};

const defaultResourceBindings = {
    dispensasjonsreferanse: {
        title: "resource.dispensasjon.dispensasjonsreferanse.title"
    },
    metadataFtbId: {
        title: "resource.metadata.ftbId.title"
    },
    kommunensSaksnummer: {
        title: "resource.kommunensSaksnummer.title"
    },
    soeknadGjelderHeader: {
        title: "resource.soeknadGjelder.title"
    },
    eiendomByggested: {
        title: "resource.eiendomByggested.eiendom.title"
    },
    adresse: {
        title: "resource.adresse.title",
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
    tiltakstyperHeader: {
        title: "resource.tiltakByggeplaner.title"
    },
    tiltakstyperKode: {
        title: "resource.tiltakstyper.type.kode.title"
    },
    tiltakshaver: {
        title: "resource.tiltakshaver.title"
    },
    tiltakshaverNavn: {
        title: "resource.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    tiltakshaverTelefonnummer: {
        title: "resource.part.telefonnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    tiltakshaverEpost: {
        title: "resource.part.epost.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    tiltakshaverAdresse: {
        title: "resource.adresse.title"
    },

    tiltakshaverKontaktperson: {
        title: "resource.tiltakshaver.kontaktperson.title"
    },
    tiltakshaverKontaktpersonNavn: {
        title: "resource.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    tiltakshaverKontaktpersonTelefonnummer: {
        title: "resource.part.telefonnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    tiltakshaverKontaktpersonEpost: {
        title: "resource.part.epost.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    tiltakshaverKontaktpersonAdresse: {
        title: "resource.adresse.title"
    },
    dispensasjonsbeskrivelse: {
        title: "resource.dispensasjonsbeskrivelse.title"
    },
    dispensasjonFraHeader: {
        title: "resource.dispensasjonFra.header"
    },
    plannavn: {
        title: "resource.navn.title"
    },
    nasjonalArealplanIdPlanIdentifikasjon: {
        title: "resource.dispensasjonFra.nasjonalArealplanId.planidentifikasjon.title"
    },
    bestemmelsestype: {
        title: "resource.dispensasjonFra.bestemmelsestype.title"
    },
    paragrafnummer: {
        title: "resource.planbestemmelse.title"
    },
    stedfesting: {
        title: "resource.stedfesting.title"
    },
    stedfestingPosisjonKoordinatsystem: {
        title: "resource.stedfesting.posisjon.koordinatsystem.title"
    },
    stedfestingPosisjonKoordinater: {
        title: "resource.stedfesting.posisjon.koordinater.title"
    },
    stedfestingVertikalnivaa: {
        title: "resource.stedfesting.vertikalnivaa.title"
    },
    varighet: {
        title: "resource.varighet.title"
    },
    varighetOenskesVarigDispensasjon: {
        trueText: "resource.varighet.oenskesVarigDispensasjon.trueText"
    },
    varighetOensketVarighetTil: {
        title: "resource.varighet.oensketVarighetTil.title"
    },
    begrunnelse: {
        title: "resource.begrunnelse.title"
    },
    begrunnelseHensynBakBestemmelsen: {
        title: "resource.begrunnelse.hensynBakBestemmelsen.title"
    },
    begrunnelseVurderingHensynBakBestemmelsen: {
        title: "resource.begrunnelse.vurderingHensynBakBestemmelsen.title"
    },
    begrunnelseVurderingHensynOverordnet: {
        title: "resource.begrunnelse.vurderingHensynOverordnet.title"
    },
    begrunnelseFordeler: {
        title: "resource.begrunnelse.fordeler.title"
    },
    begrunnelseUlemper: {
        title: "resource.begrunnelse.ulemper.title"
    },
    begrunnelseSamletBegrunnelse: {
        title: "resource.begrunnelse.samletBegrunnelse.title"
    },
    generelleVilkaarNorskSvenskDansk: {
        title: "resource.erklaeringer.title",
        trueText: "resource.generelleVilkaar.norskSvenskDansk.true.title"
    }
};

export default { markup, defaultResourceBindings };
