const markup = {
    id: "custom-dispensasjon",
    type: "Custom",
    tagName: "custom-dispensasjon",
    dataModelBindings: {
        dispensasjonBeskrivelse: "customLayout.dispensasjon.dispensasjonBeskrivelse",
        dispensasjonReferanse: "customLayout.dispensasjon.dispensasjonReferanse",
        soeknadstype: "customLayout.dispensasjon.soeknadstype",
        kommunensSaksnummer: "customLayout.dispensasjon.kommunensSaksnummer",
        metadata: "customLayout.dispensasjon.metadata",
        eiendomByggested: "customLayout.dispensasjon.eiendomByggested",
        tiltakstyper: "customLayout.dispensasjon.tiltakstyper",
        tiltakshaver: "customLayout.dispensasjon.tiltakshaver",
        ansvarligSoeker: "customLayout.dispensasjon.ansvarligSoeker",
        dispensasjonFra: "customLayout.dispensasjon.dispensasjonFra",
        stedfesting: "customLayout.dispensasjon.stedfesting",
        varighet: "customLayout.dispensasjon.varighet",
        begrunnelse: "customLayout.dispensasjon.begrunnelse",
        generelleVilkaar: "customLayout.dispensasjon.generelleVilkaar"
    }
};

const defaultResourceBindings = {
    dispensasjonReferanse: {
        title: "resource.dispensasjon.dispensasjonReferanse.title"
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
    tiltakstyperTypeHeader: {
        title: "resource.tiltakstyper.type.header"
    },
    tiltakstyperTypeKode: {
        title: "resource.tiltakstyper.type.kode.title"
    },
    tiltakshaverAdresse: {
        title: "resource.eiendom.adresse.title"
    },
    ansvarligSoekerAdresse: {
        title: "resource.eiendom.adresse.title"
    },
    dispensasjonBeskrivelseBeskrivelse: {
        title: "resource.dispensasjonBeskrivelse.beskrivelse.title"
    },
    dispensasjonFraHeader: {
        title: "resource.dispensasjonFra.header"
    },
    dispensasjonPlanBestemmelseNavn: {
        title: "resource.dispensasjonFra.dispensasjonPlanBestemmelse.navn.title"
    },
    nasjonalArealplanIdPlanIdentifikasjon: {
        title: "resource.dispensasjonFra.nasjonalArealplanId.planidentifikasjon.title"
    },
    bestemmelserType: {
        title: "resource.dispensasjonFra.bestemmelserType.title"
    },
    planBestemmelseNummerering: {
        title: "resource.dispensasjonFra.dispensasjonPlanBestemmelse.planbestemmelse.nummerering.title"
    },
    stedfestingHeader: {
        title: "resource.stedfesting.header"
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
    varighetHeader: {
        title: "resource.varighet.header"
    },
    varighetOenskesVarigDispensasjon: {
        trueText: "resource.varighet.oenskesVarigDispensasjon.true.title"
    },
    varighetOensketVarighetTil: {
        title: "resource.varighet.oensketVarighetTil.title"
    },
    begrunnelseHeader: {
        title: "resource.begrunnelse.header"
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
        title: "resource.generelleVilkaar.norskSvenskDansk.header",
        trueText: "resource.generelleVilkaar.norskSvenskDansk.true.title"
    }
};

export default { markup, defaultResourceBindings };
