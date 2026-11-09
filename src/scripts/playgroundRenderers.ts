// Dependencies
import { hasValue, validSizeValues } from "@arkitektum/altinn-studio-custom-components-utils";

// Local functions
import type { DataPath, MarkupFlagKey } from "./playground.ts";
import { getFieldKind, getMarkupFlags, parseNumberInput, setValueAtPath } from "./playground.ts";
import type { ComponentMarkup } from "../types.ts";

/** Called with where a value sits in the data and what it was changed to. */
type FieldChangeHandler = (path: DataPath, value: unknown) => void;

/** Called with the markup flag that changed and its new value. */
type MarkupChangeHandler = (key: MarkupFlagKey, value: string | boolean) => void;

/**
 * Renders the "Prøv selv" panel, which lets a reader change the markup flags and the data an example renders with.
 *
 * The panel keeps the changed markup and data itself and hands both over on every change, so the caller only has to
 * render the example with what it is given. Tilbakestill hands back the example's own and draws the fields again.
 *
 * @param markup - The example's markup, which is never changed.
 * @param data - The example's data, which is never changed.
 * @param onChange - Called with the changed markup and data after every edit.
 * @returns The panel, closed.
 */
export function renderPlayground(
    markup: ComponentMarkup,
    data: unknown,
    onChange: (markup: ComponentMarkup, data: unknown) => void
): HTMLDetailsElement {
    const panelElement = document.createElement("details");
    panelElement.classList.add("component-example-playground");

    const summaryElement = document.createElement("summary");
    summaryElement.textContent = "Prøv selv";
    panelElement.appendChild(summaryElement);

    let currentMarkup = markup;
    let currentData = data;
    const handleMarkupChange: MarkupChangeHandler = (key, value) => {
        currentMarkup = { ...currentMarkup, [key]: value };
        onChange(currentMarkup, currentData);
    };
    const handleFieldChange: FieldChangeHandler = (path, value) => {
        currentData = setValueAtPath(currentData, path, value);
        onChange(currentMarkup, currentData);
    };

    // Everything that Tilbakestill draws again. The button itself sits outside it, so it keeps focus when pressed.
    const editorsElement = document.createElement("div");
    editorsElement.classList.add("playground-editors");
    const drawEditors = (): void => {
        const editorElements: HTMLElement[] = [];
        if (getMarkupFlags(markup).length > 0) {
            editorElements.push(renderMarkupFields(markup, handleMarkupChange));
        }
        if (hasValue(data)) {
            editorElements.push(renderPlaygroundFields(data, handleFieldChange));
        }
        editorsElement.replaceChildren(...editorElements);
    };

    const resetButtonElement = document.createElement("button");
    resetButtonElement.type = "button";
    resetButtonElement.classList.add("playground-reset");
    resetButtonElement.textContent = "Tilbakestill";
    resetButtonElement.addEventListener("click", () => {
        currentMarkup = markup;
        currentData = data;
        drawEditors();
        onChange(markup, data);
    });

    // The fields are built the first time the panel opens. The layout examples alone have hundreds of values, and
    // most readers never open the panel.
    panelElement.addEventListener("toggle", () => {
        if (panelElement.open && !panelElement.querySelector(".playground-content")) {
            const contentElement = document.createElement("div");
            contentElement.classList.add("playground-content");
            const toolbarElement = document.createElement("div");
            toolbarElement.classList.add("playground-toolbar");
            toolbarElement.appendChild(resetButtonElement);
            drawEditors();
            contentElement.append(toolbarElement, editorsElement);
            panelElement.appendChild(contentElement);
        }
    });

    return panelElement;
}

/**
 * Renders a field for each markup flag the example sets: a checkbox for a true or false flag, a select for size.
 *
 * @param markup - The example's markup.
 * @param onChange - Called when a flag changes.
 * @returns The fieldset holding them.
 */
function renderMarkupFields(markup: ComponentMarkup, onChange: MarkupChangeHandler): HTMLFieldSetElement {
    const fieldsetElement = document.createElement("fieldset");
    fieldsetElement.classList.add("playground-group", "playground-markup");
    const legendElement = document.createElement("legend");
    const legendTextElement = document.createElement("span");
    legendTextElement.classList.add("playground-group-name");
    legendTextElement.textContent = "Markup";
    legendElement.appendChild(legendTextElement);
    fieldsetElement.appendChild(legendElement);

    for (const key of getMarkupFlags(markup)) {
        const labelElement = document.createElement("label");
        labelElement.classList.add("playground-field");
        const labelTextElement = document.createElement("span");
        labelTextElement.textContent = key;

        if (key === "size") {
            const selectElement = document.createElement("select");
            for (const size of validSizeValues) {
                const optionElement = document.createElement("option");
                optionElement.value = size;
                optionElement.textContent = size;
                selectElement.appendChild(optionElement);
            }
            selectElement.value = String(markup.size);
            selectElement.addEventListener("change", () => onChange(key, selectElement.value));
            labelElement.append(labelTextElement, selectElement);
        } else {
            labelElement.classList.add("playground-field-checkbox");
            const checkboxElement = document.createElement("input");
            checkboxElement.type = "checkbox";
            checkboxElement.checked = markup[key] === true;
            checkboxElement.addEventListener("change", () => onChange(key, checkboxElement.checked));
            labelElement.append(checkboxElement, labelTextElement);
        }
        fieldsetElement.appendChild(labelElement);
    }
    return fieldsetElement;
}

/**
 * Renders a field for every value in the data, nested the way the data is.
 *
 * @param data - The data to make fields for.
 * @param onChange - Called when a field changes.
 * @returns The fields.
 */
export function renderPlaygroundFields(data: unknown, onChange: FieldChangeHandler): HTMLDivElement {
    const containerElement = document.createElement("div");
    containerElement.classList.add("playground-fields");
    containerElement.append(...renderChildFields(data, [], onChange));
    return containerElement;
}

/**
 * Renders a field for each value inside a group.
 *
 * @param value - The group.
 * @param path - Where it sits in the data.
 * @param onChange - Called when a field changes.
 * @returns The fields.
 */
function renderChildFields(value: unknown, path: DataPath, onChange: FieldChangeHandler): HTMLElement[] {
    if (value !== null && typeof value === "object") {
        return Object.entries(value).map(([key, childValue]) => renderField(key, childValue, [...path, key], onChange));
    }
    return [];
}

/**
 * Renders the field for one value: a fieldset holding more fields for a group or a list, an input for anything else.
 *
 * @param label - The value's key, or its number in a list.
 * @param value - The value.
 * @param path - Where it sits in the data.
 * @param onChange - Called when a field changes.
 * @returns The field.
 */
function renderField(label: string, value: unknown, path: DataPath, onChange: FieldChangeHandler): HTMLElement {
    const kind = getFieldKind(value);
    if (kind === "group" || kind === "list") {
        return renderGroupField(label, value, path, onChange);
    }

    const labelElement = document.createElement("label");
    labelElement.classList.add("playground-field");
    const labelTextElement = document.createElement("span");
    labelTextElement.textContent = label;

    if (kind === "boolean") {
        labelElement.append(
            labelTextElement,
            renderBooleanSelect(value, (selected) => onChange(path, selected))
        );
        return labelElement;
    }

    const inputElement = document.createElement("input");
    if (kind === "number") {
        inputElement.type = "number";
        inputElement.value = String(value);
        inputElement.addEventListener("input", () => onChange(path, parseNumberInput(inputElement.value)));
    } else {
        inputElement.type = "text";
        inputElement.value = value === null || value === undefined ? "" : String(value);
        inputElement.addEventListener("input", () => onChange(path, inputElement.value));
    }
    labelElement.append(labelTextElement, inputElement);
    return labelElement;
}

/**
 * Renders the select for a true or false value. A checkbox has no third state, and a value that is neither is one
 * worth trying: custom-field-boolean-data, for one, shows its default text for it.
 *
 * @param value - The value from the example data.
 * @param onSelect - Called with true, false, or null for no value.
 * @returns The select.
 */
function renderBooleanSelect(value: unknown, onSelect: (selected: boolean | null) => void): HTMLSelectElement {
    const selectElement = document.createElement("select");
    for (const [optionValue, optionText] of [
        ["true", "Ja"],
        ["false", "Nei"],
        ["", "Tom"]
    ] as const) {
        const optionElement = document.createElement("option");
        optionElement.value = optionValue;
        optionElement.textContent = optionText;
        selectElement.appendChild(optionElement);
    }
    selectElement.value = value === true ? "true" : value === false ? "false" : "";
    selectElement.addEventListener("change", () => {
        onSelect(selectElement.value === "" ? null : selectElement.value === "true");
    });
    return selectElement;
}

/**
 * Renders a group or a list as a fieldset, with a "Tom" checkbox in its legend that sets it to no value.
 *
 * The fieldset keeps its own current value, updated from every change made inside it, so unticking "Tom" puts back
 * what was there with any edits kept, and a list can draw its items again after one is added or removed. The fields
 * inside are disabled while it is empty. The checkbox stays usable, as controls in a fieldset's own legend are not
 * disabled with it.
 *
 * @param label - The value's key, or its number in a list.
 * @param value - The group or list.
 * @param path - Where it sits in the data.
 * @param onChange - Called when a field changes.
 * @param startEmpty - Draws it with "Tom" ticked. Unticking it then gives the value it was drawn with.
 * @returns The fieldset.
 */
function renderGroupField(label: string, value: unknown, path: DataPath, onChange: FieldChangeHandler, startEmpty = false): HTMLFieldSetElement {
    let currentValue = value;
    const handleChildChange: FieldChangeHandler = (childPath, childValue) => {
        currentValue = setValueAtPath(currentValue, childPath.slice(path.length), childValue);
        onChange(childPath, childValue);
    };

    const fieldsetElement = document.createElement("fieldset");
    fieldsetElement.classList.add("playground-group");
    fieldsetElement.disabled = startEmpty;

    const legendElement = document.createElement("legend");
    const legendTextElement = document.createElement("span");
    legendTextElement.classList.add("playground-group-name");
    legendTextElement.textContent = label;
    legendElement.appendChild(legendTextElement);

    const emptyLabelElement = document.createElement("label");
    emptyLabelElement.classList.add("playground-empty-toggle");
    const emptyCheckboxElement = document.createElement("input");
    emptyCheckboxElement.type = "checkbox";
    emptyCheckboxElement.checked = startEmpty;
    emptyCheckboxElement.addEventListener("change", () => {
        fieldsetElement.disabled = emptyCheckboxElement.checked;
        onChange(path, emptyCheckboxElement.checked ? null : currentValue);
    });
    emptyLabelElement.append(emptyCheckboxElement, "Tom");
    legendElement.appendChild(emptyLabelElement);
    fieldsetElement.appendChild(legendElement);

    if (!Array.isArray(value)) {
        fieldsetElement.append(...renderChildFields(value, path, handleChildChange));
        return fieldsetElement;
    }

    // A list's items sit in a wrapper of their own so they can be drawn again on their own. CSS lays them out as if
    // the wrapper were not there.
    const itemsElement = document.createElement("div");
    itemsElement.classList.add("playground-list-items");
    fieldsetElement.appendChild(itemsElement);

    // A new item is a copy of the last one, or of the example's first one once the list has been emptied.
    const getItemToCopy = (): unknown => (currentValue as unknown[]).at(-1) ?? value[0];

    const addButtonElement = document.createElement("button");
    addButtonElement.type = "button";
    addButtonElement.classList.add("playground-list-add");
    addButtonElement.textContent = "Legg til element";
    addButtonElement.setAttribute("aria-label", `Legg til element i ${label}`);

    const setItems = (items: unknown[]): void => {
        currentValue = items;
        onChange(path, items);
        drawItems();
    };

    const drawItems = (): void => {
        const items = currentValue as unknown[];
        if (items.length === 0) {
            itemsElement.replaceChildren(renderEmptyNote());
        } else {
            itemsElement.replaceChildren(
                ...items.map((item, index) => {
                    const itemLabel = `Element ${index + 1}`;
                    const itemPath = [...path, index];
                    // An item set to Tom is null, which has no shape to draw. It is drawn as an empty copy of the
                    // example's first item instead, so it does not turn into a text field when the list is redrawn.
                    const itemShape = value[0];
                    const itemElement =
                        item === null && (getFieldKind(itemShape) === "group" || getFieldKind(itemShape) === "list")
                            ? renderGroupField(itemLabel, itemShape, itemPath, handleChildChange, true)
                            : renderField(itemLabel, item, itemPath, handleChildChange);
                    const removeButtonElement = document.createElement("button");
                    removeButtonElement.type = "button";
                    removeButtonElement.classList.add("playground-list-remove");
                    removeButtonElement.textContent = "Fjern";
                    removeButtonElement.setAttribute("aria-label", `Fjern ${itemLabel} fra ${label}`);
                    removeButtonElement.addEventListener("click", () => {
                        // Read now, not when drawn, so edits made to other items since then are kept.
                        setItems((currentValue as unknown[]).filter((_, itemIndex) => itemIndex !== index));
                        // The button pressed is gone, so focus moves to the one now in its place, or else to adding.
                        const removeButtons = itemsElement.querySelectorAll(".playground-list-remove");
                        const nextFocus =
                            (removeButtons[Math.min(index, removeButtons.length - 1)] as HTMLButtonElement | undefined) ?? addButtonElement;
                        nextFocus.focus();
                    });
                    if (itemElement instanceof HTMLFieldSetElement) {
                        itemElement.querySelector("legend")!.appendChild(removeButtonElement);
                        return itemElement;
                    }
                    const rowElement = document.createElement("div");
                    rowElement.classList.add("playground-list-item");
                    rowElement.append(itemElement, removeButtonElement);
                    return rowElement;
                })
            );
        }
        addButtonElement.hidden = getItemToCopy() === undefined;
    };

    addButtonElement.addEventListener("click", () => {
        // The new item can share the copied one, as an edit copies what it changes rather than changing it.
        setItems([...(currentValue as unknown[]), getItemToCopy()]);
        (
            itemsElement.lastElementChild?.querySelector(".playground-field > input, .playground-field > select") as HTMLElement | null | undefined
        )?.focus();
    });

    drawItems();
    fieldsetElement.appendChild(addButtonElement);
    return fieldsetElement;
}

/**
 * Renders the note shown in place of the items of an empty list.
 *
 * @returns The note.
 */
function renderEmptyNote(): HTMLParagraphElement {
    const noteElement = document.createElement("p");
    noteElement.classList.add("playground-empty");
    noteElement.textContent = "Ingen elementer";
    return noteElement;
}
