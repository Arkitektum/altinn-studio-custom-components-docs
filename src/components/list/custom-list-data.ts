import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-list-data",
    type: "Custom",
    tagName: "custom-list-data",
    hideTitle: false,
    hideIfEmpty: false,
    itemKey: "kodebeskrivelse",
    dataModelBindings: {
        data: "customList.data"
    },
    resourceBindings: {
        title: "resource.customList.data.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
