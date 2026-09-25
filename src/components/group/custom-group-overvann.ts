import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-group-overvann",
    type: "Custom",
    tagName: "custom-group-overvann",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.overvann"
    }
} satisfies ComponentMarkup;

const defaultResourceBindings = {
    title: "resource.overvann.title",
    emptyFieldText: "resource.emptyFieldText.default",
    ledesOvervannTilTerreng: {
        title: `resource.rammebetingelser.overvann.ledesOvervannTilTerreng.title`,
        trueText: `resource.trueText.default`,
        falseText: `resource.falseText.default`
    },
    ledesOvervannTilAvloepssystem: {
        title: `resource.rammebetingelser.overvann.ledesOvervannTilAvloepssystem.title`,
        trueText: `resource.trueText.default`,
        falseText: `resource.falseText.default`
    }
};

export default { markup, defaultResourceBindings } satisfies ComponentExample;
