const markup = {
    id: "custom-group-rammebetingelser-krav-til-byggegrunn",
    type: "Custom",
    tagName: "custom-group-rammebetingelser-krav-til-byggegrunn",
    hideIfEmpty: true,
    size: "h2",
    dataModelBindings: {
        data: "customGroup.rammebetingelserKravTilByggegrunn"
    }
};

const defaultResourceBindings = {
    title: "resource.kravTilByggegrunn.title",
    emptyFieldText: "resource.emptyFieldText.default",
    risikotype: {
        title: "resource.kravTilByggegrunn.muligeOmraadeRisikoer.omraadeRisiko.risikotype.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    sikkerhetsklasse: {
        title: "resource.kravTilByggegrunn.muligeOmraadeRisikoer.omraadeRisiko.sikkerhetsklasse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    omraaderisiko: {
        title: "resource.kravTilByggegrunn.muligeOmraadeRisikoer.omraadeRisiko.title"
    },
    harMiljoeforhold: {
        title: "resource.rammebetingelser.kravTilByggegrunn.harMiljoeforhold.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default"
    }
};

export default { markup, defaultResourceBindings };
