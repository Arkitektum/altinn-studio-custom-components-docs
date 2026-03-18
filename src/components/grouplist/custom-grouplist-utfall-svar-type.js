const markup = {
    id: "utfallBesvarelse-utfallSvar",
    type: "Custom",
    tagName: "custom-grouplist-utfall-svar-type",
    dataModelBindings: {
        data: "customGrouplist.utfallSvar"
    },
    resourceBindings: {
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

const defaultResourceBindings = {
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
    },
    title: "resource.utfallBesvarelse.utfallSvar.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
