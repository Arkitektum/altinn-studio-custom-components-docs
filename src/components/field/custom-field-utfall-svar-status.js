const markup = {
    id: "utfallBesvarelse-utfallSvar-status",
    type: "Custom",
    tagName: "custom-field-utfall-svar-status",
    hideTitle: false,
    hideIfEmpty: false,
    dataModelBindings: {
        data: "customField.utfallSvarStatus"
    }
};

const defaultResourceBindings = {
    title: "resource.status.title",
    erUtfallBesvaresSenere: "resource.utfallBesvarelse.utfallSvar.erUtfallBesvaresSenere",
    erUtfallBesvart: "resource.utfallBesvarelse.utfallSvar.erUtfallBesvart",
    status: "resource.utfallBesvarelse.utfallSvar.status"
};

export default { markup, defaultResourceBindings };
