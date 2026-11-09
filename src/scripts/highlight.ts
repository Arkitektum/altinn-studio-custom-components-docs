// Dependencies
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

// Every code block on the page is JSON, so that is the only language registered.
hljs.registerLanguage("json", json);

/**
 * Highlights a code block again after its text has changed.
 *
 * highlight.js marks what it has highlighted and skips it with a warning the next time, so the mark has to go first.
 *
 * @param element - The code element, already holding its new text.
 */
export function highlightAgain(element: HTMLElement): void {
    delete element.dataset.highlighted;
    hljs.highlightElement(element);
}

export default hljs;
