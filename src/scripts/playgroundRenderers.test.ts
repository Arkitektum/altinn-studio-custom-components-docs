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
        vedlegg: [],
        merknader: ["Første", "Andre"]
    }
};

/** The field whose label reads the given text. */
function fieldFor(container: HTMLElement, label: string): HTMLLabelElement {
    const field = Array.from(container.querySelectorAll(".playground-field")).find((element) => element.firstElementChild!.textContent === label);
    if (!field) {
        throw new Error(`No field labelled ${label}`);
    }
    return field as HTMLLabelElement;
}

/** The input inside the field whose label reads the given text. */
function inputFor(container: HTMLElement, label: string): HTMLInputElement {
    return fieldFor(container, label).querySelector("input")!;
}

/** The first fieldset with the given name, for a group, a list or a list item. */
function groupNamed(container: HTMLElement, name: string): HTMLFieldSetElement {
    const group = Array.from(container.querySelectorAll("fieldset")).find(
        (fieldset) => fieldset.querySelector(":scope > legend > .playground-group-name")!.textContent === name
    );
    if (!group) {
        throw new Error(`No group named ${name}`);
    }
    return group;
}

/** The names of the items a list shows, in order. */
function itemNames(list: HTMLFieldSetElement): string[] {
    return Array.from(list.querySelectorAll(":scope > .playground-list-items > fieldset > legend > .playground-group-name")).map(
        (name) => name.textContent!
    );
}

/** Types a value into an input the way a reader does, which fires an input event. */
function typeInto(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event("input"));
}

/** Picks the option with the given text the way a reader does. */
function choose(select: HTMLSelectElement, optionText: string): void {
    select.selectedIndex = Array.from(select.options).findIndex((option) => option.textContent === optionText);
    select.dispatchEvent(new Event("change"));
}

/** Ticks or unticks the Tom checkbox of a group or list. */
function setEmpty(group: HTMLFieldSetElement, empty: boolean): void {
    const checkbox = group.querySelector(":scope > legend .playground-empty-toggle input") as HTMLInputElement;
    checkbox.checked = empty;
    checkbox.dispatchEvent(new Event("change"));
}

/** Presses a button among a fieldset's own controls: Fjern in an item's legend, or Legg til element in a list. */
function press(group: HTMLFieldSetElement, className: string): void {
    (group.querySelector(`:scope > legend > .${className}, :scope > .${className}`) as HTMLButtonElement).click();
}

/** Renders the fields, recording every change, and the last value reported for each path. */
function renderRecorded(): { fields: HTMLDivElement; changes: [DataPath, unknown][] } {
    const changes: [DataPath, unknown][] = [];
    const fields = renderPlaygroundFields(data, (path, value) => changes.push([path, value]));
    document.body.replaceChildren(fields);
    return { fields, changes };
}

/** Opens the panel the way a reader does. */
function open(panel: HTMLDetailsElement): void {
    panel.open = true;
    panel.dispatchEvent(new Event("toggle"));
}

describe("renderPlaygroundFields", () => {
    it("gives text and numbers an input each, filled in with the value", () => {
        const fields = renderPlaygroundFields(data, () => {});

        expect(inputFor(fields, "navn").type).toBe("text");
        expect(inputFor(fields, "navn").value).toBe("Selskap AS");
        expect(inputFor(fields, "saksaar").type).toBe("number");
        expect(inputFor(fields, "saksaar").value).toBe("2024");
    });

    it("gives true or false a select with a third choice for no value", () => {
        const fields = renderPlaygroundFields(data, () => {});

        const select = fieldFor(fields, "erTiltakshaver").querySelector("select")!;
        expect(Array.from(select.options).map((option) => option.textContent)).toEqual(["Ja", "Nei", "Tom"]);
        expect(select.value).toBe("true");
        expect(renderPlaygroundFields({ svar: false }, () => {}).querySelector("select")!.value).toBe("false");
    });

    it("gives a null value an empty text field", () => {
        const fields = renderPlaygroundFields(data, () => {});

        expect(inputFor(fields, "adresselinje2").type).toBe("text");
        expect(inputFor(fields, "adresselinje2").value).toBe("");
    });

    it("nests groups and lists in fieldsets named after them, numbering list items", () => {
        const fields = renderPlaygroundFields(data, () => {});

        const names = Array.from(fields.querySelectorAll("legend > .playground-group-name")).map((name) => name.textContent);
        expect(names).toEqual(["data", "tiltakstyper", "Element 1", "Element 2", "vedlegg", "merknader"]);
        expect(inputFor(groupNamed(fields, "Element 2"), "kodeverdi").value).toBe("fasade");
        expect(inputFor(groupNamed(fields, "merknader"), "Element 2").value).toBe("Andre");
    });

    it("says so when a list is empty", () => {
        const fields = renderPlaygroundFields(data, () => {});

        expect(groupNamed(fields, "vedlegg").querySelector(".playground-empty")!.textContent).toBe("Ingen elementer");
    });

    it("reports where an edited value sits and what it became", () => {
        const { fields, changes } = renderRecorded();

        typeInto(inputFor(fields, "navn"), "Annet AS");
        typeInto(inputFor(fields, "saksaar"), "2025");
        typeInto(inputFor(fields, "saksaar"), "");
        choose(fieldFor(fields, "erTiltakshaver").querySelector("select")!, "Nei");
        choose(fieldFor(fields, "erTiltakshaver").querySelector("select")!, "Tom");
        typeInto(inputFor(groupNamed(fields, "Element 2"), "kodeverdi"), "tilbygg");

        expect(changes).toEqual([
            [["data", "navn"], "Annet AS"],
            [["data", "saksaar"], 2025],
            [["data", "saksaar"], null],
            [["data", "erTiltakshaver"], false],
            [["data", "erTiltakshaver"], null],
            [["data", "tiltakstyper", 1, "kodeverdi"], "tilbygg"]
        ]);
    });
});

describe("the Tom checkbox", () => {
    it("sets a group to no value and disables the fields in it, but not itself", () => {
        const { fields, changes } = renderRecorded();
        const group = groupNamed(fields, "Element 1");

        setEmpty(group, true);

        expect(changes).toEqual([[["data", "tiltakstyper", 0], null]]);
        expect(group.disabled).toBe(true);
        expect(inputFor(group, "kodeverdi").matches(":disabled")).toBe(true);
        expect(group.querySelector(".playground-empty-toggle input")!.matches(":disabled")).toBe(false);
    });

    it("puts back what was there when unticked, with the edits made before", () => {
        const { fields, changes } = renderRecorded();
        const group = groupNamed(fields, "Element 1");
        typeInto(inputFor(group, "kodeverdi"), "tilbygg");

        setEmpty(group, true);
        setEmpty(group, false);

        expect(group.disabled).toBe(false);
        expect(changes.at(-1)).toEqual([["data", "tiltakstyper", 0], { kodeverdi: "tilbygg" }]);
    });

    it("puts back a whole list with items removed and edited further down", () => {
        const { fields, changes } = renderRecorded();
        press(groupNamed(fields, "Element 1"), "playground-list-remove");
        typeInto(inputFor(groupNamed(fields, "Element 1"), "kodeverdi"), "tilbygg");
        const outer = groupNamed(fields, "data");

        setEmpty(outer, true);
        setEmpty(outer, false);

        expect(changes.at(-1)).toEqual([["data"], { ...data.data, tiltakstyper: [{ kodeverdi: "tilbygg" }] }]);
    });
});

describe("editing a list", () => {
    it("removes an item, numbering the rest again", () => {
        const { fields, changes } = renderRecorded();
        const list = groupNamed(fields, "tiltakstyper");

        press(groupNamed(list, "Element 1"), "playground-list-remove");

        expect(changes).toEqual([[["data", "tiltakstyper"], [{ kodeverdi: "fasade" }]]]);
        expect(itemNames(list)).toEqual(["Element 1"]);
        expect(inputFor(list, "kodeverdi").value).toBe("fasade");
    });

    it("keeps edits made to the other items when one is removed", () => {
        const { fields, changes } = renderRecorded();
        const list = groupNamed(fields, "tiltakstyper");
        typeInto(inputFor(groupNamed(list, "Element 2"), "kodeverdi"), "tilbygg");

        press(groupNamed(list, "Element 1"), "playground-list-remove");

        expect(changes.at(-1)).toEqual([["data", "tiltakstyper"], [{ kodeverdi: "tilbygg" }]]);
    });

    it("gives the paths of the items that moved up their new index", () => {
        const { fields, changes } = renderRecorded();
        const list = groupNamed(fields, "tiltakstyper");
        press(groupNamed(list, "Element 1"), "playground-list-remove");

        typeInto(inputFor(list, "kodeverdi"), "tilbygg");

        expect(changes.at(-1)).toEqual([["data", "tiltakstyper", 0, "kodeverdi"], "tilbygg"]);
    });

    it("moves focus to the Fjern button now in the removed item's place, or to Legg til element", () => {
        const { fields } = renderRecorded();
        const list = groupNamed(fields, "tiltakstyper");

        press(groupNamed(list, "Element 2"), "playground-list-remove");
        expect(document.activeElement).toBe(groupNamed(list, "Element 1").querySelector(".playground-list-remove"));

        press(groupNamed(list, "Element 1"), "playground-list-remove");
        expect(document.activeElement).toBe(list.querySelector(":scope > .playground-list-add"));
    });

    it("says so once the last item is removed", () => {
        const { fields } = renderRecorded();
        const list = groupNamed(fields, "merknader");

        (list.querySelector(".playground-list-remove") as HTMLButtonElement).click();
        (list.querySelector(".playground-list-remove") as HTMLButtonElement).click();

        expect(list.querySelector(".playground-empty")!.textContent).toBe("Ingen elementer");
    });

    it("adds a copy of the last item, which can then be edited on its own", () => {
        const { fields, changes } = renderRecorded();
        const list = groupNamed(fields, "tiltakstyper");
        typeInto(inputFor(groupNamed(list, "Element 2"), "kodeverdi"), "tilbygg");

        press(list, "playground-list-add");
        typeInto(inputFor(groupNamed(list, "Element 3"), "kodeverdi"), "riving");

        expect(changes.at(-2)).toEqual([
            ["data", "tiltakstyper"],
            [{ kodeverdi: "nyttbyggboligformal" }, { kodeverdi: "tilbygg" }, { kodeverdi: "tilbygg" }]
        ]);
        expect(changes.at(-1)).toEqual([["data", "tiltakstyper", 2, "kodeverdi"], "riving"]);
        expect(inputFor(groupNamed(list, "Element 2"), "kodeverdi").value).toBe("tilbygg");
        expect(document.activeElement).toBe(inputFor(groupNamed(list, "Element 3"), "kodeverdi"));
    });

    it("adds a copy of the example's first item once the list has been emptied", () => {
        const { fields, changes } = renderRecorded();
        const list = groupNamed(fields, "tiltakstyper");
        press(groupNamed(list, "Element 1"), "playground-list-remove");
        press(groupNamed(list, "Element 1"), "playground-list-remove");

        press(list, "playground-list-add");

        expect(changes.at(-1)).toEqual([["data", "tiltakstyper"], [{ kodeverdi: "nyttbyggboligformal" }]]);
    });

    it("offers no Legg til element for a list that was empty in the example, as there is nothing to copy", () => {
        const { fields } = renderRecorded();

        expect((groupNamed(fields, "vedlegg").querySelector(".playground-list-add") as HTMLButtonElement).hidden).toBe(true);
        expect((groupNamed(fields, "tiltakstyper").querySelector(".playground-list-add") as HTMLButtonElement).hidden).toBe(false);
    });

    it("can still remove an item set to Tom", () => {
        const { fields, changes } = renderRecorded();
        const list = groupNamed(fields, "tiltakstyper");
        const item = groupNamed(list, "Element 1");
        setEmpty(item, true);

        const removeButton = item.querySelector(".playground-list-remove") as HTMLButtonElement;
        expect(removeButton.matches(":disabled")).toBe(false);
        removeButton.click();

        expect(changes.at(-1)).toEqual([["data", "tiltakstyper"], [{ kodeverdi: "fasade" }]]);
    });

    it("keeps an item set to Tom drawn as an empty group when the list is drawn again", () => {
        const { fields, changes } = renderRecorded();
        const list = groupNamed(fields, "tiltakstyper");
        setEmpty(groupNamed(list, "Element 2"), true);

        press(groupNamed(list, "Element 1"), "playground-list-remove");

        expect(changes.at(-1)).toEqual([["data", "tiltakstyper"], [null]]);
        const item = groupNamed(list, "Element 1");
        expect(item.disabled).toBe(true);
        expect((item.querySelector(".playground-empty-toggle input") as HTMLInputElement).checked).toBe(true);
        expect(inputFor(item, "kodeverdi").value).toBe("nyttbyggboligformal");
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
