const markup = {
    id: "custom-table-ansvarsomraade",
    type: "Custom",
    tagName: "custom-table-ansvarsomraade",
    size: "h2",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customTable.ansvarsomraade"
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
