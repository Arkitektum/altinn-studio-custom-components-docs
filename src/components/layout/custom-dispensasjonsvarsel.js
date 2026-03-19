const markup = {
    id: "custom-dispensasjonsvarsel",
    type: "Custom",
    tagName: "custom-dispensasjonsvarsel",
    dataModelBindings: {
        annetTema: "customLayout.dispensasjonsvarsel.annetTema",
        bestemmelsesoverskrift: "customLayout.dispensasjonsvarsel.bestemmelsesoverskrift",
        bestemmelsestekst: "customLayout.dispensasjonsvarsel.bestemmelsestekst",
        bestemmelsestype: "customLayout.dispensasjonsvarsel.bestemmelsestype",
        dispVarselBeskrivelse: "customLayout.dispensasjonsvarsel.dispVarselBeskrivelse",
        dispensasjonstema: "customLayout.dispensasjonsvarsel.dispensasjonstema",
        paragrafnummer: "customLayout.dispensasjonsvarsel.paragrafnummer",
        plannavn: "customLayout.dispensasjonsvarsel.plannavn"
    }
};

const defaultResourceBindings = {
    bestemmelse: {
        title: "resource.dispensasjonsvarsel.bestemmelse.title"
    },
    dispensasjonsvarsel: {
        title: "resource.dispensasjonsvarsel.title"
    },
    dispVarselBeskrivelse: {
        title: "resource.dispensasjonsvarsel.dispVarselBeskrivelse.title"
    },
    emne: {
        title: "resource.emne.title"
    },
    plannavn: {
        title: "resource.dispensasjonsvarsel.plannavn.title"
    },
    paragrafnummer: {
        title: "resource.dispensasjonsvarsel.paragrafnummer.title"
    },
    spoersmaalOmDispensasjonssoeknaden: {
        title: "resource.dispensasjonsvarsel.spoersmaalOmDispensasjonssoeknaden.title"
    }
};

export default { markup, defaultResourceBindings };
