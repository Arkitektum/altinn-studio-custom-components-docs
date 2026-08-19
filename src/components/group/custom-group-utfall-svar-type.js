const utfallType = "svv";

// The title depends on the utfall type, so the component has no default for it: the parent
// custom-grouplist-utfall-svar-type resolves the type into a flat `title` binding, and this example does the same.
// The type itself is not passed to the component, which reads nothing but the title from it.
const markup = {
    id: "custom-group-utfall-svar-type",
    type: "Custom",
    tagName: "custom-group-utfall-svar-type",
    dataModelBindings: {
        data: "customGroup.utfallSvarType"
    },
    resourceBindings: {
        title: `resource.utfallBesvarelse.utfallSvar.${utfallType?.toLowerCase()}.header`,
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

const defaultResourceBindings = {
    emptyFieldText: "resource.emptyFieldText.default",
    kommentar: {
        title: `resource.kommentar.title`
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
