import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "customField-boolean-data",
    type: "Custom",
    tagName: "custom-field-boolean-data",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        simpleBinding: "customField.booleanData.condition",
        trueData: "customField.booleanData.trueData",
        falseData: "customField.booleanData.falseData",
        defaultData: "customField.booleanData.defaultData"
    },
    resourceBindings: {
        title: "resource.customField.booleanData.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
