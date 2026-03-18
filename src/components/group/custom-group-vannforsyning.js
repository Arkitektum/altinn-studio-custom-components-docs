const markup = {
    id: "custom-group-vannforsyning",
    type: "Custom",
    tagName: "custom-group-vannforsyning",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.vannforsyning"
    }
};

const defaultResourceBindings = {
    title: "resource.rammebetingelser.vannforsyning.title",
    emptyFieldText: "resource.emptyFieldText.default",
    beskrivelse: {
        title: `resource.beskrivelse.title`
    },
    harTinglystErklaering: {
        title: `resource.rammebetingelser.vannforsyning.harTinglystErklaering.title`,
        trueText: `resource.trueText.default`,
        falseText: `resource.falseText.default`
    },
    krysserVannforsyningAnnensGrunn: {
        title: `resource.rammebetingelser.vannforsyning.krysserVannforsyningAnnensGrunn.title`,
        trueText: `resource.trueText.default`,
        falseText: `resource.falseText.default`
    },
    tilknytningstype: {
        title: `resource.rammebetingelser.vannforsyning.tilknytningstype.title`
    }
};

export default { markup, defaultResourceBindings };
