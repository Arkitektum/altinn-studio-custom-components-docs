const markup = {
    id: "custom-gjennomfoeringsplan",
    type: "Custom",
    tagName: "custom-gjennomfoeringsplan",
    dataModelBindings: {
        versjon: "customLayout.gjennomfoeringsplan.versjon",
        gjennomfoeringsplan: "customLayout.gjennomfoeringsplan.gjennomfoeringsplan",
        metadata: "customLayout.gjennomfoeringsplan.metadata",
        kommunensSaksnummer: "customLayout.gjennomfoeringsplan.kommunensSaksnummer",
        eiendomByggested: "customLayout.gjennomfoeringsplan.eiendomByggested",
        ansvarligSoeker: "customLayout.gjennomfoeringsplan.ansvarligSoeker"
    }
};

const defaultResourceBindings = {
    gjennomfoeringsplan: {
        title: "resource.gjennomfoeringsplan.title",
        description: "resource.gjennomfoeringsplan.description"
    },
    planenGjelder: {
        title: "resource.planenGjelder.title"
    },
    ansvarsfordeling: {
        title: "resource.ansvarsfordeling.title"
    },
    versjon: {
        title: "resource.versjon.title"
    },
    kommunensSaksnummer: {
        title: "resource.kommunensSaksnummer.title"
    },
    metadataProsjektnavn: {
        title: "resource.metadata.prosjekt.title"
    },
    metadataFtbId: {
        title: "resource.metadata.ftbId.title"
    },
    tiltaksklasse: {
        title: "resource.tiltaksklasse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ansvarsomraade: {
        title: "resource.beskrivelseAvAnsvarsomraadet.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ansvarligSoeker: {
        title: "resource.ansvarligSoeker.title"
    },
    ansvarligSoekerNavn: {
        title: "resource.part.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ansvarligSoekerTelefonnummer: {
        title: "resource.part.telefonnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ansvarligSoekerEpost: {
        title: "resource.part.epost.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    foretak: {
        title: "resource.foretak.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    planlagteSamsvarKontrollErklaeringer: {
        title: "resource.planlagteSamsvarKontrollErklaeringer.title",
        emptyFieldText: "resource.planlagteSamsvarKontrollErklaeringer.emptyFieldText.default",
        emptyFieldTextAvsluttet: "resource.planlagteSamsvarKontrollErklaeringer.emptyFieldText.avsluttet"
    },
    ansvarsomraadeStatus: {
        title: "resource.ansvarsomraadeStatus.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    samsvarKontrollPlanlagtVedRammetillatelse: {
        title: "resource.samsvarKontrollPlanlagtVedRammetillatelse.title"
    },
    samsvarKontrollPlanlagtVedIgangsettingstillatelse: {
        title: "resource.samsvarKontrollPlanlagtVedIgangsettingstillatelse.title"
    },
    samsvarKontrollPlanlagtVedMidlertidigBrukstillatelse: {
        title: "resource.samsvarKontrollPlanlagtVedMidlertidigBrukstillatelse.title"
    },
    samsvarKontrollPlanlagtVedFerdigattest: {
        title: "resource.samsvarKontrollPlanlagtVedFerdigattest.title"
    }
};

const options = {
    pageOrientation: "landscape"
};

export default { markup, defaultResourceBindings, options };
