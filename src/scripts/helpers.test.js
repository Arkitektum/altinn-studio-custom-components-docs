import { getComponentNameFromTagName, getComponentTypeNameFromKey } from "./helpers.js";

describe("getComponentNameFromTagName", () => {
    it("returns the display name for a known tag", () => {
        expect(getComponentNameFromTagName("custom-table-eiendom")).toBe("Eiendom");
    });

    it("falls back to the tag name for an unknown tag", () => {
        expect(getComponentNameFromTagName("custom-not-a-component")).toBe("custom-not-a-component");
    });

    it("falls back rather than returning undefined for a missing tag name", () => {
        expect(getComponentNameFromTagName(undefined)).toBeUndefined();
    });
});

describe("getComponentTypeNameFromKey", () => {
    it("returns the Norwegian name for a known type", () => {
        expect(getComponentTypeNameFromKey("table")).toBe("Tabell");
        expect(getComponentTypeNameFromKey("matrix")).toBe("Matrise");
        expect(getComponentTypeNameFromKey("layout")).toBe("Underskjema");
    });

    it("falls back to the key for an unknown type", () => {
        expect(getComponentTypeNameFromKey("nothing")).toBe("nothing");
    });
});
