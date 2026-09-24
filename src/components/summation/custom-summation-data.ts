import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-summation-data",
    type: "Custom",
    tagName: "custom-summation-data",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customSummation.data"
    },
    resourceBindings: {
        title: "resource.customSummation.data.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
