const markup = {
    id: "custom-group-rammebetingelser-tilknytninger",
    type: "Custom",
    tagName: "custom-group-rammebetingelser-tilknytninger",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.rammebetingelserTilknytninger"
    }
};

const defaultResourceBindings = {
    title: "resource.rammebetingelser.tilknytning.title",
    emptyFieldText: "resource.emptyFieldText.default",
    adkomst: {
        title: "resource.rammebetingelser.adkomst.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    adkomstErNyEllerEndretAdkomst: {
        title: "resource.rammebetingelser.adkomst.erNyEllerEndretAdkomst.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default"
    },
    adkomstVegtype: {
        title: "resource.rammebetingelser.adkomst.vegtype.title"
    },
    adkomstErTillatelseGitt: {
        title: "resource.rammebetingelser.adkomst.erTillatelseGitt.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default",
        defaultText: "resource.emptyFieldText.default"
    },
    avloep: {
        title: "resource.rammebetingelser.avloep.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    avloepHarTinglystErklaering: {
        title: "resource.rammebetingelser.avloep.harTinglystErklaering.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default"
    },
    avloepKrysserAvloepAnnensGrunn: {
        title: "resource.rammebetingelser.avloep.krysserAvloepAnnensGrunn.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default"
    },
    avloepTilknytningstype: {
        title: "resource.rammebetingelser.avloep.tilknytningstype.title"
    },
    overvann: {
        title: "resource.rammebetingelser.overvann.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    overvannLedesOvervannTilTerreng: {
        title: "resource.rammebetingelser.overvann.ledesOvervannTilTerreng.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default"
    },
    overvannLedesOvervannTilAvloepssystem: {
        title: "resource.rammebetingelser.overvann.ledesOvervannTilAvloepssystem.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default"
    },
    vannforsyning: {
        title: "resource.rammebetingelser.vannforsyning.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    vannforsyningBeskrivelse: {
        title: "resource.beskrivelse.title"
    },
    vannforsyningHarTinglystErklaering: {
        title: "resource.rammebetingelser.vannforsyning.harTinglystErklaering.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default"
    },
    vannforsyningKrysserVannforsyningAnnensGrunn: {
        title: "resource.rammebetingelser.vannforsyning.krysserVannforsyningAnnensGrunn.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default"
    },
    vannforsyningTilknytningstype: {
        title: "resource.rammebetingelser.vannforsyning.tilknytningstype.title"
    }
};

export default { markup, defaultResourceBindings };
