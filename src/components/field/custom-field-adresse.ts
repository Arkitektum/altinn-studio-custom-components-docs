import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "customField-adresse",
    type: "Custom",
    tagName: "custom-field-adresse",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customField.adresse"
    },
    resourceBindings: {
        title: "resource.adresse.title",
        emptyFieldText: "resource.emptyFieldText.address"
    }
} satisfies ComponentMarkup;

const defaultResourceBindings = {
    title: "resource.adresse.title",
    emptyFieldText: "resource.emptyFieldText.address"
};

export default { markup, defaultResourceBindings } satisfies ComponentExample;
