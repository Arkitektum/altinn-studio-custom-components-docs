import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-table-arbeidsplasser",
    type: "Custom",
    tagName: "custom-table-arbeidsplasser",
    size: "h2",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customTable.arbeidsplasser"
    },
    resourceBindings: {
        title: "resource.arbeidsplasser.title",
        emptyFieldText: "resource.arbeidsplasser.emptyFieldText"
    }
} satisfies ComponentMarkup;

// Keyed rather than written out: the five workplace kinds below are added in a loop, so this needs to be
// indexable by name.
const defaultResourceBindings: Record<string, unknown> = {
    arbeidsplasserKey: {
        title: `resource.arbeidsplasser.arbeidsplasserKey.title`
    },
    beroertAvTiltaket: {
        title: `resource.arbeidsplasser.beroertAvTiltaket.title`
    },
    title: "resource.arbeidsplasser.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

const arbeidsplasserBeroertKeys = ["eksisterende", "faste", "framtidige", "midlertidige", "utleieBygg"];
for (const key of arbeidsplasserBeroertKeys) {
    defaultResourceBindings[key] = {
        title: `resource.arbeidsplasser.${key}.title`,
        trueText: `resource.trueText.default`,
        falseText: `resource.falseText.default`
    };
}

export default { markup, defaultResourceBindings } satisfies ComponentExample;
