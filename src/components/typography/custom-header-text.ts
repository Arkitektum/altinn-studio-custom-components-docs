import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-header-text",
    type: "Custom",
    tagName: "custom-header-text",
    size: "h2",
    resourceBindings: {
        title: "resource.customHeader.text.title"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
