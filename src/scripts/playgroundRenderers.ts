// Local functions
import { getFieldKind, parseNumberInput, setValueAtPath } from "./playground.ts";
import type { DataPath } from "./playground.ts";

/** Called with where a value sits in the data and what it was changed to. */
type FieldChangeHandler = (path: DataPath, value: unknown) => void;

/**
 * Renders the "Prøv selv" panel, which lets a reader change the data an example renders with.
 *
 * The panel keeps the changed data itself and hands all of it over on every change, so the caller only has to
 * render the example with what it is given.
 *
 * @param data - The example's data, which is never changed.
 * @param onChange - Called with the changed data after every edit.
 * @returns The panel, closed.
 */
export function renderPlayground(data: unknown, onChange: (data: unknown) => void): HTMLDetailsElement {
    const panelElement = document.createElement("details");
    panelElement.classList.add("component-example-playground");

    const summaryElement = document.createElement("summary");
    summaryElement.textContent = "Prøv selv";
    panelElement.appendChild(summaryElement);

    let currentData = data;
    const handleFieldChange: FieldChangeHandler = (path, value) => {
        currentData = setValueAtPath(currentData, path, value);
        onChange(currentData);
    };

    // The fields are built the first time the panel opens. The layout examples alone have hundreds of values, and
    // most readers never open the panel.
    panelElement.addEventListener("toggle", () => {
        if (panelElement.open && !panelElement.querySelector(".playground-fields")) {
            panelElement.appendChild(renderPlaygroundFields(data, handleFieldChange));
        }
    });

    return panelElement;
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
