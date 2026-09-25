import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-group-vegtype-tillatelse",
    type: "Custom",
    tagName: "custom-group-vegtype-tillatelse",
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customGroup.vegtypeTillatelse"
    }
} satisfies ComponentMarkup;

const defaultResourceBindings = {
    vegtype: {
        title: "resource.rammebetingelser.adkomst.vegtype.title"
    },
    erTillatelseGitt: {
        title: "resource.rammebetingelser.adkomst.erTillatelseGitt.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default",
        defaultText: "resource.emptyFieldText.default"
    },
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings } satisfies ComponentExample;
