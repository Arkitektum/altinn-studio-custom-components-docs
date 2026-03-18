const markup = {
    id: "custom-grouplist-ettersending",
    type: "Custom",
    tagName: "custom-grouplist-ettersending",
    hideTitle: false,
    hideIfEmpty: false,
    size: "h2",
    dataModelBindings: {
        data: "customGrouplist.ettersending"
    },
    resourceBindings: {
        title: "resource.customGrouplist.ettersending.title",
        emptyFieldText: "resource.customGrouplist.ettersending.emptyFieldText.default"
    }
};
const defaultResourceBindings = {
    tema: {
        title: "resource.ettersendinger.ettersending.tema.kodebeskrivelse.title"
    },
    kommentar: {
        title: "resource.ettersendinger.ettersending.kommentar.title"
    },
    vedleggsliste: {
        title: "resource.ettersendinger.ettersending.vedleggsliste.vedlegg.title"
    },
    title: "resource.ettersendinger.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
