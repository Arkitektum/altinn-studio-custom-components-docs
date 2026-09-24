import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-group-utfall-svar",
    type: "Custom",
    tagName: "custom-group-utfall-svar",
    dataModelBindings: {
        data: "customGroup.utfallSvar"
    }
} satisfies ComponentMarkup;

const defaultResourceBindings = {
    emptyFieldText: "resource.emptyFieldText.default",
    utfallSvarStatus: {
        title: "resource.status.title",
        status: "resource.utfallBesvarelse.utfallSvar.status",
        erUtfallBesvaresSenere: "resource.utfallBesvarelse.utfallSvar.erUtfallBesvaresSenere",
        erUtfallBesvart: "resource.utfallBesvarelse.utfallSvar.erUtfallBesvart"
    },
    tema: {
        title: "resource.tema.title"
    },
    kommentar: {
        title: "resource.kommentar.title"
    },
    vedleggsliste: {
        title: "resource.vedlegg.title"
    }
};

export default { markup, defaultResourceBindings } satisfies ComponentExample;
