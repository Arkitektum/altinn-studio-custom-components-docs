import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-paragraph-text",
    type: "Custom",
    tagName: "custom-paragraph-text",
    resourceBindings: {
        title: "resource.customParagraph.text.title"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;