import { describe, expect, it } from "@jest/globals";
import { getFieldKind, getMarkupFlags, parseNumberInput, setValueAtPath } from "./playground.ts";

describe("getFieldKind", () => {
    it("reads the kind off the value", () => {
        expect(getFieldKind("Selskap AS")).toBe("text");
        expect(getFieldKind("")).toBe("text");
        expect(getFieldKind(2024)).toBe("number");
        expect(getFieldKind(0)).toBe("number");
        expect(getFieldKind(true)).toBe("boolean");
        expect(getFieldKind(false)).toBe("boolean");
        expect(getFieldKind({ kodeverdi: "kode123" })).toBe("group");
        expect(getFieldKind([{ label: "Element 1" }])).toBe("list");
        expect(getFieldKind([])).toBe("list");
    });

    it("gives a value with no type to read a text field", () => {
        expect(getFieldKind(null)).toBe("text");
        expect(getFieldKind(undefined)).toBe("text");
    });
});

describe("setValueAtPath", () => {
    const data = {
        part: { navn: "Selskap AS", adresse: { postnr: "3802" } },
        rader: [{ verdi: 1 }, { verdi: 2 }],
        annet: { uendret: true }
    };

    it("replaces a nested value in an object", () => {
        expect(setValueAtPath(data, ["part", "adresse", "postnr"], "1234")).toEqual({
            ...data,
            part: { navn: "Selskap AS", adresse: { postnr: "1234" } }
        });
    });

    it("replaces a value inside a list item", () => {
        expect(setValueAtPath(data, ["rader", 1, "verdi"], 5)).toEqual({ ...data, rader: [{ verdi: 1 }, { verdi: 5 }] });
    });

    it("keeps a list a list", () => {
        const result = setValueAtPath(data, ["rader", 0], null) as typeof data;
        expect(Array.isArray(result.rader)).toBe(true);
        expect(result.rader).toEqual([null, { verdi: 2 }]);
    });

    it("leaves the original unchanged", () => {
        const before = JSON.stringify(data);
        setValueAtPath(data, ["part", "adresse", "postnr"], "1234");
        setValueAtPath(data, ["rader", 0, "verdi"], 9);
        expect(JSON.stringify(data)).toBe(before);
    });

    it("copies only what lies on the path", () => {
        const result = setValueAtPath(data, ["part", "navn"], "Annet AS") as typeof data;
        expect(result).not.toBe(data);
        expect(result.part).not.toBe(data.part);
        expect(result.part.adresse).toBe(data.part.adresse);
        expect(result.annet).toBe(data.annet);
    });

    it("replaces the whole value for an empty path", () => {
        expect(setValueAtPath(data, [], "ny")).toBe("ny");
    });

    it("starts a new object or list when the path goes through an empty value", () => {
        expect(setValueAtPath({ part: null }, ["part", "navn"], "Selskap AS")).toEqual({ part: { navn: "Selskap AS" } });
        expect(setValueAtPath({ rader: null }, ["rader", 0], "a")).toEqual({ rader: ["a"] });
    });
});

describe("parseNumberInput", () => {
    it("reads a number", () => {
        expect(parseNumberInput("2024")).toBe(2024);
        expect(parseNumberInput("12.5")).toBe(12.5);
        expect(parseNumberInput("0")).toBe(0);
    });

    it("reads a cleared field as no value rather than 0", () => {
        expect(parseNumberInput("")).toBeNull();
        expect(parseNumberInput("  ")).toBeNull();
    });

    it("reads anything else as no value", () => {
        expect(parseNumberInput("abc")).toBeNull();
    });
});

describe("getMarkupFlags", () => {
    it("offers the flags the markup sets, whatever they are set to, in the panel's order", () => {
        expect(getMarkupFlags({ tagName: "custom-field-data", hideIfEmpty: false, size: "h2", hideTitle: true, enableLinks: false })).toEqual([
            "size",
            "hideTitle",
            "hideIfEmpty",
            "enableLinks"
        ]);
        expect(getMarkupFlags({ tagName: "custom-field-data", inline: false, hideOrgNr: false })).toEqual(["inline", "hideOrgNr"]);
    });

    it("offers nothing that is not a flag, and nothing for markup without any", () => {
        expect(getMarkupFlags({ tagName: "custom-field-data", id: "x", dataModelBindings: { simpleBinding: "a" } })).toEqual([]);
    });
});
