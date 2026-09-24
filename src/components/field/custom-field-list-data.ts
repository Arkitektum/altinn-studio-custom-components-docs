import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-field-list-data",
    type: "Custom",
    tagName: "custom-field-list-data",
    hideIfEmpty: true,
    dataTitleItemKey: "label",
    dataItemKey: "value",
    dataModelBindings: {
        data: "customField.listData"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
