const markup = {
    id: "custom-group-dispensasjon-oversikt",
    type: "Custom",
    tagName: "custom-group-dispensasjon-oversikt",
    size: "h2",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "dispensasjonOversikt"
    }
};

const defaultResourceBindings = {
    count: {
        title: "resource.dispensasjonOversikt.dispensasjon.count.title",
        emptyFieldText: "resource.emptyFieldText.zero"
    },
    dispensasjon: {
        rowNumberTitle: "resource.nummer.short",
        dispensasjonKategori: "resource.kategori.title",
        dispensasjonTittel: "resource.emne.title",
        bestemmelserType: "resource.dispensasjonOversikt.dispensasjon.bestemmelserType.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    title: "resource.dispensasjonOversikt.header",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
