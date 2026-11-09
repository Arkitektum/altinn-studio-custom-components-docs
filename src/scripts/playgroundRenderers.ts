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
 * Renders a field for each value inside a group or a list. List items are numbered, as they have no names.
 *
 * @param value - The group or list.
 * @param path - Where it sits in the data.
 * @param onChange - Called when a field changes.
 * @returns The fields, or a note saying there is nothing in it.
 */
function renderChildFields(value: unknown, path: DataPath, onChange: FieldChangeHandler): HTMLElement[] {
    if (Array.isArray(value)) {
        if (value.length === 0) {
            return [renderEmptyNote()];
        }
        return value.map((item, index) => renderField(`Element ${index + 1}`, item, [...path, index], onChange));
    }
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
        const fieldsetElement = document.createElement("fieldset");
        fieldsetElement.classList.add("playground-group");
        const legendElement = document.createElement("legend");
        legendElement.textContent = label;
        fieldsetElement.appendChild(legendElement);
        fieldsetElement.append(...renderChildFields(value, path, onChange));
        return fieldsetElement;
    }

    const labelElement = document.createElement("label");
    labelElement.classList.add("playground-field");
    const labelTextElement = document.createElement("span");
    labelTextElement.textContent = label;
    const inputElement = document.createElement("input");

    if (kind === "boolean") {
        labelElement.classList.add("playground-field-checkbox");
        inputElement.type = "checkbox";
        inputElement.checked = value === true;
        inputElement.addEventListener("change", () => onChange(path, inputElement.checked));
        labelElement.append(inputElement, labelTextElement);
        return labelElement;
    }

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
 * Renders the note shown in place of the fields of an empty list.
 *
 * @returns The note.
 */
function renderEmptyNote(): HTMLParagraphElement {
    const noteElement = document.createElement("p");
    noteElement.classList.add("playground-empty");
    noteElement.textContent = "Ingen elementer";
    return noteElement;
}
