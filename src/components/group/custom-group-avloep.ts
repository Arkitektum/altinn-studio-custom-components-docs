import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-group-avloep",
    type: "Custom",
    tagName: "custom-group-avloep",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.avloep"
    }
} satisfies ComponentMarkup;

const defaultResourceBindings = {
    title: "resource.avloep.title",
    emptyFieldText: "resource.emptyFieldText.default",
    harTinglystErklaering: {
        title: `resource.rammebetingelser.avloep.harTinglystErklaering.title`,
        trueText: `resource.trueText.default`,
        falseText: `resource.falseText.default`
    },
    krysserAvloepAnnensGrunn: {
        title: `resource.rammebetingelser.avloep.krysserAvloepAnnensGrunn.title`,
        trueText: `resource.trueText.default`,
        falseText: `resource.falseText.default`
    },
    tilknytningstype: {
        title: `resource.tilknytning.title`
    }
};

export default { markup, defaultResourceBindings } satisfies ComponentExample;
