const markup = {
    id: "custom-grouplist-ansvarsomraade-type",
    type: "Custom",
    tagName: "custom-grouplist-ansvarsomraade-type",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGrouplist.ansvarsomraade"
    }
};

const defaultResourceBindings = {
    tiltaksklasse: {
        title: "resource.tiltaksklasse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    ansvarsomraade: {
        title: "resource.beskrivelseAvAnsvarsomraadet.title",
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
    },
    title: "resource.ansvarsfordeling.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
