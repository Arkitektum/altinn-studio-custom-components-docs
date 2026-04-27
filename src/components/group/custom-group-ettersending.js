const markup = {
    id: "custom-group-ettersending",
    type: "Custom",
    tagName: "custom-group-ettersending",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.ettersending"
    }
};

const defaultResourceBindings = {
    emptyFieldText: "resource.emptyFieldText.default",
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

export default { markup, defaultResourceBindings };
