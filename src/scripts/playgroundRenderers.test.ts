import { describe, expect, it } from "@jest/globals";
import { renderPlayground, renderPlaygroundFields } from "./playgroundRenderers.ts";
import type { DataPath } from "./playground.ts";

const data = {
    data: {
        navn: "Selskap AS",
        adresselinje2: null,
        saksaar: 2024,
        erTiltakshaver: true,
        tiltakstyper: [{ kodeverdi: "nyttbyggboligformal" }, { kodeverdi: "fasade" }],
        vedlegg: []
    }
};

/** The input inside the field whose label reads the given text. */
function inputFor(container: HTMLElement, label: string): HTMLInputElement {
    const field = Array.from(container.querySelectorAll(".playground-field")).find((element) => element.textContent === label);
    if (!field) {
        throw new Error(`No field labelled ${label}`);
    }
    return field.querySelector("input")!;
}

/** Types a value into an input the way a reader does, which fires an input event. */
function typeInto(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event("input"));
}

/** Opens the panel the way a reader does. */
function open(panel: HTMLDetailsElement): void {
    panel.open = true;
    panel.dispatchEvent(new Event("toggle"));
}

describe("renderPlaygroundFields", () => {
    it("gives text, numbers and true or false a field each, filled in with the value", () => {
        const fields = renderPlaygroundFields(data, () => {});

        expect(inputFor(fields, "navn").type).toBe("text");
        expect(inputFor(fields, "navn").value).toBe("Selskap AS");
        expect(inputFor(fields, "saksaar").type).toBe("number");
        expect(inputFor(fields, "saksaar").value).toBe("2024");
        expect(inputFor(fields, "erTiltakshaver").type).toBe("checkbox");
        expect(inputFor(fields, "erTiltakshaver").checked).toBe(true);
    });

    it("gives a null value an empty text field", () => {
        const fields = renderPlaygroundFields(data, () => {});

        expect(inputFor(fields, "adresselinje2").type).toBe("text");
        expect(inputFor(fields, "adresselinje2").value).toBe("");
    });

    it("nests groups and lists in fieldsets named after them, numbering list items", () => {
        const fields = renderPlaygroundFields(data, () => {});

        const legends = Array.from(fields.querySelectorAll("legend")).map((legend) => legend.textContent);
        expect(legends).toEqual(["data", "tiltakstyper", "Element 1", "Element 2", "vedlegg"]);
        const secondItem = Array.from(fields.querySelectorAll("fieldset")).find((fieldset) => fieldset.firstChild!.textContent === "Element 2")!;
        expect(inputFor(secondItem, "kodeverdi").value).toBe("fasade");
    });

    it("says so when a list is empty", () => {
        const fields = renderPlaygroundFields(data, () => {});

        const vedlegg = Array.from(fields.querySelectorAll("fieldset")).find((fieldset) => fieldset.firstChild!.textContent === "vedlegg")!;
        expect(vedlegg.querySelector(".playground-empty")!.textContent).toBe("Ingen elementer");
    });

    it("reports where an edited value sits and what it became", () => {
        const changes: [DataPath, unknown][] = [];
        const fields = renderPlaygroundFields(data, (path, value) => changes.push([path, value]));

        typeInto(inputFor(fields, "navn"), "Annet AS");
        typeInto(inputFor(fields, "saksaar"), "2025");
        typeInto(inputFor(fields, "saksaar"), "");
        const checkbox = inputFor(fields, "erTiltakshaver");
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event("change"));
        const secondItem = Array.from(fields.querySelectorAll("fieldset")).find((fieldset) => fieldset.firstChild!.textContent === "Element 2")!;
        typeInto(inputFor(secondItem, "kodeverdi"), "tilbygg");

        expect(changes).toEqual([
            [["data", "navn"], "Annet AS"],
            [["data", "saksaar"], 2025],
            [["data", "saksaar"], null],
            [["data", "erTiltakshaver"], false],
            [["data", "tiltakstyper", 1, "kodeverdi"], "tilbygg"]
        ]);
    });
});

describe("renderPlayground", () => {
    it("starts closed, titled Prøv selv, with no fields until it is opened", () => {
        const panel = renderPlayground(data, () => {});

        expect(panel.open).toBe(false);
        expect(panel.querySelector("summary")!.textContent).toBe("Prøv selv");
        expect(panel.querySelector(".playground-fields")).toBeNull();

        open(panel);

        expect(panel.querySelectorAll(".playground-fields")).toHaveLength(1);
    });

    it("builds the fields once, however often it is opened", () => {
        const panel = renderPlayground(data, () => {});

        open(panel);
        panel.open = false;
        panel.dispatchEvent(new Event("toggle"));
        open(panel);

        expect(panel.querySelectorAll(".playground-fields")).toHaveLength(1);
    });

    it("hands over all of the changed data on every edit, keeping earlier edits", () => {
        const changed: unknown[] = [];
        const panel = renderPlayground(data, (changedData) => changed.push(changedData));
        open(panel);

        typeInto(inputFor(panel, "navn"), "Annet AS");
        typeInto(inputFor(panel, "saksaar"), "2025");

        expect(changed).toHaveLength(2);
        expect(changed[1]).toEqual({ data: { ...data.data, navn: "Annet AS", saksaar: 2025 } });
    });

    it("leaves the example's own data unchanged", () => {
        const before = JSON.stringify(data);
        const panel = renderPlayground(data, () => {});
        open(panel);

        typeInto(inputFor(panel, "navn"), "Annet AS");

        expect(JSON.stringify(data)).toBe(before);
    });
});
