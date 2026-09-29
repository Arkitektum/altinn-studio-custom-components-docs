import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-group-fakturamottaker",
    type: "Custom",
    tagName: "custom-group-fakturamottaker",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.fakturamottaker"
    }
} satisfies ComponentMarkup;

const defaultResourceBindings = {
    title: "resource.tiltakshaver.fakturamottaker.title",
    emptyFieldText: "resource.emptyFieldText.default",
    navn: {
        title: "resource.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    adresse: {
        title: "resource.adresse.title"
    },
    organisasjonsnummer: {
        title: "resource.organisasjonsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    bestillerreferanse: {
        title: "resource.bestillerreferanse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    fakturareferanse: {
        title: "resource.fakturareferanse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    prosjektnummer: {
        title: "resource.prosjektnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    epost: {
        title: "resource.epostadresse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

export default { markup, defaultResourceBindings } satisfies ComponentExample;
