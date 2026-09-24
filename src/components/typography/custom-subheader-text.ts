import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-subheader-text",
    type: "Custom",
    tagName: "custom-subheader-text",
    resourceBindings: {
        title: "resource.customSubheader.text.title"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
