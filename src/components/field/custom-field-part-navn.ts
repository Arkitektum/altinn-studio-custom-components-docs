import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-field-part-navn",
    type: "Custom",
    tagName: "custom-field-part-navn",
    hideTitle: true,
    hideIfEmpty: false,
    hideOrgNr: false,
    dataModelBindings: {
        data: "customField.part"
    },
    resourceBindings: {
        title: "resource.customField.part.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
