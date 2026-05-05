const markup = {
    id: "tiltakshaver.kontaktperson",
    type: "Custom",
    tagName: "custom-table-part",
    size: "h2",
    hideIfEmpty: true,
    dataModelBindings: {
        data: "tiltakshaver.kontaktperson"
    }
};

const defaultResourceBindings = {
    navn: {
        title: `resource.navn.title`,
        emptyFieldText: "resource.emptyFieldText.default"
    },
    telefonnummer: {
        title: `resource.telefonnummer.title`,
        emptyFieldText: "resource.emptyFieldText.default"
    },
    epost: {
        title: `resource.part.epost.title`,
        emptyFieldText: "resource.emptyFieldText.default"
    },
    title: `resource.tiltakshaver.title`,
    emptyFieldText: "resource.emptyFieldText.default"
};
export default { markup, defaultResourceBindings };
