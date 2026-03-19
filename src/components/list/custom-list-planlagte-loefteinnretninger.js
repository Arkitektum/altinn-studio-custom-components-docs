const markup = {
    id: "custom-list-planlagte-loefteinnretninger",
    type: "Custom",
    tagName: "custom-list-planlagte-loefteinnretninger",
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customList.loefteinnretninger"
    },
    resourceBindings: {
        title: "resource.rammebetingelser.loefteinnretninger.title"
    }
};

const defaultResourceBindings = {
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
    title: "resource.loefteinnretninger.title",
    emptyFieldText: "resource.emptyFieldText.default"
};

export default { markup, defaultResourceBindings };
