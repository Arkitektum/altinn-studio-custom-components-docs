const markup = {
    id: "custom-group-utfall-svar",
    type: "Custom",
    tagName: "custom-group-utfall-svar",
    dataModelBindings: {
        data: "customGroup.utfallSvar"
    }
};

const defaultResourceBindings = {
    emptyFieldText: "resource.emptyFieldText.default",
    utfallSvarStatus: {
        title: "resource.utfallBesvarelse.utfallSvar.status.title",
        status: "resource.utfallBesvarelse.utfallSvar.status",
        erUtfallBesvaresSenere: "resource.utfallBesvarelse.utfallSvar.erUtfallBesvaresSenere",
        erUtfallBesvart: "resource.utfallBesvarelse.utfallSvar.erUtfallBesvart"
    },
    tema: {
        title: "resource.utfallBesvarelse.utfallSvar.tema.kodebeskrivelse.title"
    },
    kommentar: {
        title: "resource.utfallBesvarelse.utfallSvar.kommentar.title"
    },
    vedleggsliste: {
        title: "resource.utfallBesvarelse.utfallSvar.vedleggsliste.vedlegg.title"
    }
};

export default { markup, defaultResourceBindings };
