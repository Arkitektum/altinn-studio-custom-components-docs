import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-group-sjekklistekrav",
    type: "Custom",
    tagName: "custom-group-sjekklistekrav",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.sjekklistekrav"
    }
} satisfies ComponentMarkup;

const defaultResourceBindings = {
    emptyFieldText: "resource.emptyFieldText.default",
    trueText: "resource.trueText.default",
    falseText: "resource.falseText.default",
    defaultText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings } satisfies ComponentExample;
