const markup = {
    id: "custom-grouplist-utfall-svar-type",
    type: "Custom",
    tagName: "custom-grouplist-utfall-svar",
    hideIfEmpty: false,
    hideTitle: false,
    enableLinks: false,
    dataModelBindings: {
        data: "customGrouplist.utfallSvar"
    },
    resourceBindings: {
        title: "resource.utfallBesvarelse.utfallSvar.svv.header"
    }
};

const defaultResourceBindings = {
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
        title: "resource.utfallBesvarelse.utfallSvar.kommentar.title"
    },
    vedleggsliste: {
        title: "resource.vedlegg.title"
    },
    title: "resource.utfallBesvarelse.utfallSvar.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
