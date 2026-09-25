import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-table-part-gjennomfoeringsplan",
    type: "Custom",
    tagName: "custom-table-part-gjennomfoeringsplan",
    size: "h2",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customTable.partGjennomfoeringsplan"
    }
} satisfies ComponentMarkup;

const defaultResourceBindings = {
    navn: {
        title: "resource.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    organisasjonsnummer: {
        title: "resource.organisasjonsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    tiltaksklasse: {
        title: "resource.tiltaksklasse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    title: "resource.soeker.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings } satisfies ComponentExample;
