import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-field-telefonnummer",
    type: "Custom",
    tagName: "custom-field-telefonnummer",
    hideTitle: true,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customField.part"
    },
    resourceBindings: {
        title: "resource.telefonnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
