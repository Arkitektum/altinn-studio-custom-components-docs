/**
 * The data side of the "Prøv selv" panel, which lets a reader change the data an example renders with.
 *
 * Nothing here knows about the DOM. The panel asks what kind of field a value needs, and hands back a new copy of
 * the data with one value changed, so the example's own data is never touched and resetting is just rendering it
 * again.
 */

/** Where a value sits in an example's data: object keys, and indexes into lists. */
export type DataPath = (string | number)[];

/**
 * What kind of field a value is edited with. A group is an object whose values get fields of their own, and a list
 * is an array whose items do.
 */
export type FieldKind = "text" | "number" | "boolean" | "group" | "list";

/**
 * Returns the kind of field a value is edited with.
 *
 * The kind is read off the example value, as there is no schema to ask. A value that is null or missing in the
 * example has nothing to read it off, so it gets a text field, which is what most of them are in the data models.
 *
 * @param value - The value from the example data.
 * @returns The kind of field to edit it with.
 */
export function getFieldKind(value: unknown): FieldKind {
    if (Array.isArray(value)) {
        return "list";
    }
    if (typeof value === "boolean") {
        return "boolean";
    }
    if (typeof value === "number") {
        return "number";
    }
    if (value !== null && typeof value === "object") {
        return "group";
    }
    return "text";
}

/**
 * Returns a copy of the data with the value at the path replaced.
 *
 * Only the objects and lists along the path are copied, and the rest is shared with the original, which is never
 * changed. A step through a value that is not an object or a list (a group someone has emptied, say) starts a new
 * one: a list for an index, an object for a key.
 *
 * @param data - The data to copy.
 * @param path - Where the value to replace sits. An empty path replaces the data itself.
 * @param value - The new value.
 * @returns The changed copy.
 */
export function setValueAtPath(data: unknown, path: DataPath, value: unknown): unknown {
    if (path.length === 0) {
        return value;
    }
    const [key, ...rest] = path as [string | number, ...DataPath];
    if (Array.isArray(data)) {
        const copy = [...data];
        copy[key as number] = setValueAtPath(copy[key as number], rest, value);
        return copy;
    }
    if (data !== null && typeof data === "object") {
        const record = data as Record<string, unknown>;
        return { ...record, [key]: setValueAtPath(record[key], rest, value) };
    }
    if (typeof key === "number") {
        const list: unknown[] = [];
        list[key] = setValueAtPath(undefined, rest, value);
        return list;
    }
    return { [key]: setValueAtPath(undefined, rest, value) };
}

/**
 * Reads a number field. A cleared field is null rather than 0, so clearing it shows the component with no value.
 *
 * @param raw - The input's value. A number input reports anything it cannot read as a number as an empty string.
 * @returns The number, or null if there is none.
 */
export function parseNumberInput(raw: string): number | null {
    if (raw.trim() === "") {
        return null;
    }
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
}
