const utfallType = "svv";

const markup = {
    id: "custom-group-utfall-svar-type",
    type: "Custom",
    tagName: "custom-group-utfall-svar-type",
    dataModelBindings: {
        data: "customGroup.utfallSvarType"
    },
    resourceValues: {
        utfallType
    }
};

const defaultResourceBindings = {
    emptyFieldText: "resource.emptyFieldText.default",
    utfallSvarType: {
        title: `resource.utfallBesvarelse.utfallSvar.${utfallType?.toLowerCase()}.header`
    },
    kommentar: {
        title: `resource.utfallBesvarelse.utfallSvar.kommentar.title`
    },
    tema: {
        title: `resource.tema.title`
    },
    utfallSvarStatus: {
        title: `resource.status.title`
    },
    vedleggsliste: {
        title: `resource.vedlegg.title`
    }
};

export default { markup, defaultResourceBindings };
