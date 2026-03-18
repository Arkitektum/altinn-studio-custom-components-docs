const markup = {
    id: "custom-group-loefteinnretninger",
    type: "Custom",
    tagName: "custom-group-loefteinnretninger",
    hideIfEmpty: false,
    hideTitle: false,
    dataModelBindings: {
        data: "customGroup.loefteinnretninger"
    }
};

const defaultResourceBindings = {
    title: "resource.rammebetingelser.loefteinnretninger.title",
    emptyFieldText: "resource.emptyFieldText.default",
    planleggesHeis: {
        title: `resource.rammebetingelser.loefteinnretninger.planleggesHeis.title`
    },
    planleggesLoefteplattform: {
        title: `resource.rammebetingelser.loefteinnretninger.planleggesLoefteplattform.title`
    },
    planleggesRulletrapp: {
        title: `resource.rammebetingelser.loefteinnretninger.planleggesRulletrapp.title`
    },
    planleggesTrappeheis: {
        title: `resource.rammebetingelser.loefteinnretninger.planleggesTrappeheis.title`
    },
    planlagteLoefteinnretninger: {
        title: `resource.rammebetingelser.loefteinnretninger.planlagteLoefteinnretninger.title`,
        emptyFieldText: `resource.emptyFieldText.default`
    },
    planleggesLoefteinnretningIBygning: {
        title: `resource.rammebetingelser.loefteinnretninger.planleggesLoefteinnretningIBygning.title`,
        trueText: `resource.trueText.default`,
        falseText: `resource.falseText.default`
    },
    erLoefteinnretningIBygning: {
        title: `resource.rammebetingelser.loefteinnretninger.erLoefteinnretningIBygning.title`,
        trueText: `resource.trueText.default`,
        falseText: `resource.falseText.default`
    }
};

export default { markup, defaultResourceBindings };
