import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "customField-kode",
    type: "Custom",
    tagName: "custom-field-kode",
    hideIfEmpty: true,
    dataModelBindings: {
        data: "customField.kode"
    },
    resourceBindings: {
        title: "resource.customField.kode.title"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
