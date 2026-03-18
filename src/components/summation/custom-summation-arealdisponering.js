const markup = {
    id: "custom-summation-arealdisponering",
    type: "Custom",
    tagName: "custom-summation-arealdisponering",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customSummation.arealdisponering"
    },
    resourceBindings: {
        emptyFieldText: "resource.rammebetingelser.arealdisponering.emptyFieldText",
        title: "resource.rammebetingelser.arealdisponering.title"
    }
};

const defaultResourceBindings = {
    tomtearealet: {
        title: `resource.rammebetingelser.arealdisponering.tomtearealet.title`
    },
    bebyggelsen: {
        title: `resource.rammebetingelser.arealdisponering.bebyggelsen.title`
    },
    arealBebyggelseEksisterende: {
        title: `resource.rammebetingelser.arealdisponering.arealBebyggelseEksisterende.title`,
        emptyFieldText: "resource.emptyFieldText.default",
        unit: "resource.unit.meterSquared"
    },
    arealBebyggelseNytt: {
        title: `resource.rammebetingelser.arealdisponering.arealBebyggelseNytt.title`,
        emptyFieldText: "resource.emptyFieldText.default",
        operator: "resource.operator.plus",
        unit: "resource.unit.meterSquared"
    },
    arealBebyggelseSomSkalRives: {
        title: `resource.rammebetingelser.arealdisponering.arealBebyggelseSomSkalRives.title`,
        emptyFieldText: "resource.emptyFieldText.default",
        operator: "resource.operator.minus",
        unit: "resource.unit.meterSquared"
    },
    arealSumByggesak: {
        title: `resource.rammebetingelser.arealdisponering.arealSumByggesak.title`,
        emptyFieldText: "resource.emptyFieldText.default",
        operator: "resource.operator.equals",
        unit: "resource.unit.meterSquared"
    },
    beregnetMaksByggeareal: {
        title: `resource.rammebetingelser.arealdisponering.beregnetMaksByggeareal.title`,
        emptyFieldText: "resource.emptyFieldText.default",
        unit: "resource.unit.meterSquared"
    },
    parkeringsarealTerreng: {
        title: `resource.rammebetingelser.arealdisponering.parkeringsarealTerreng.title`,
        emptyFieldText: "resource.emptyFieldText.default",
        operator: "resource.operator.plus",
        unit: "resource.unit.meterSquared"
    },
    tomtearealBeregnet: {
        title: `resource.rammebetingelser.arealdisponering.tomtearealBeregnet.title`,
        emptyFieldText: "resource.emptyFieldText.default",
        operator: "resource.operator.equals",
        unit: "resource.unit.meterSquared"
    },
    tomtearealByggeomraade: {
        title: `resource.rammebetingelser.arealdisponering.tomtearealByggeomraade.title`,
        emptyFieldText: "resource.emptyFieldText.default",
        unit: "resource.unit.meterSquared"
    },
    tomtearealSomLeggesTil: {
        title: `resource.rammebetingelser.arealdisponering.tomtearealSomLeggesTil.title`,
        emptyFieldText: "resource.emptyFieldText.default",
        operator: "resource.operator.plus",
        unit: "resource.unit.meterSquared"
    },
    tomtearealSomTrekkesFra: {
        title: `resource.rammebetingelser.arealdisponering.tomtearealSomTrekkesFra.title`,
        emptyFieldText: "resource.emptyFieldText.default",
        operator: "resource.operator.minus",
        unit: "resource.unit.meterSquared"
    },
    title: "resource.arealdisponering.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
