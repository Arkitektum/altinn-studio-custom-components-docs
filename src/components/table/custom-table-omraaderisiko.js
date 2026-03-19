const markup = {
    id: "custom-table-omraaderisiko",
    type: "Custom",
    tagName: "custom-table-omraaderisiko",
    hideIfEmpty: false,
    hideTitle: false,
    size: "h2",
    dataModelBindings: {
        data: "customTable.omraadeRisiko"
    }
};

const defaultResourceBindings = {
    risikotype: {
        title: "resource.kravTilByggegrunn.muligeOmraadeRisikoer.omraadeRisiko.risikotype.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    sikkerhetsklasse: {
        title: "resource.kravTilByggegrunn.muligeOmraadeRisikoer.omraadeRisiko.sikkerhetsklasse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    title: "resource.kravTilByggegrunn.muligeOmraadeRisikoer.omraadeRisiko.title",
    description: "resource.kravTilByggegrunn.muligeOmraadeRisikoer.omraadeRisiko.description",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
