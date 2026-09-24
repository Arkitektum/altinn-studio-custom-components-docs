import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-field-kommunens-saksnummer",
    type: "Custom",
    tagName: "custom-field-kommunens-saksnummer",
    hideTitle: false,
    hideIfEmpty: false,
    inline: false,
    dataModelBindings: {
        data: "customField.kommunensSaksnummer"
    },
    resourceBindings: {
        title: "resource.kommunensSaksnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
