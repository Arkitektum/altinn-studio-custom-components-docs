const markup = {
    id: "custom-group-avloep",
    type: "Custom",
    tagName: "custom-group-avloep",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.avloep"
    }
};

const defaultResourceBindings = {
    title: "resource.rammebetingelser.avloep.title",
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
        title: `resource.rammebetingelser.avloep.tilknytningstype.title`
    }
};

export default { markup, defaultResourceBindings };
