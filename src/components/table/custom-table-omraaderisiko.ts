import type { ComponentExample, ComponentMarkup } from "../../types.ts";

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
} satisfies ComponentMarkup;

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
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings } satisfies ComponentExample;
