const markup = {
    id: "custom-group-overvann",
    type: "Custom",
    tagName: "custom-group-overvann",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.overvann"
    }
};

const defaultResourceBindings = {
    title: "resource.rammebetingelser.overvann.title",
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

export default { markup, defaultResourceBindings };
