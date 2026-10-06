import { describe, expect, it } from "@jest/globals";
import componentGroups from "./index.ts";
import defaultTextResources from "@arkitektum/altinn-studio-custom-components/dist/resource.nb.json";
import textResources from "../data/textResources.ts";

/**
 * Whether every resource id an example names exists, either among the gallery's own text resources or among the ones the components package ships.
 *
 * The gallery's resources panel shows an id it cannot find as the raw key, so a wrong id is visible on the page but nothing fails. The ids in `defaultResourceBindings` are meant to mirror the defaults the component falls back on, and they drift when a component's default changes.
 */
const knownIds = new Set([...textResources.resources, ...defaultTextResources.resources].map((resource) => resource.id));

/** Every string under a value that names a resource, with the path it was found at. */
function resourceIds(value: unknown, path: string): { path: string; id: string }[] {
    if (typeof value === "string") {
        return value.startsWith("resource.") ? [{ path, id: value }] : [];
    }
    if (value && typeof value === "object") {
        return Object.entries(value).flatMap(([key, child]) => resourceIds(child, `${path}.${key}`));
    }
    return [];
}

describe("the resource ids the examples name", () => {
    it("all exist, in the gallery's text resources or in the components package", () => {
        const missing = Object.values(componentGroups)
            .flatMap((group) => Object.values(group))
            .flatMap((example) => [
                ...resourceIds(example.markup.resourceBindings, `${example.markup.tagName} resourceBindings`),
                ...resourceIds(example.defaultResourceBindings, `${example.markup.tagName} defaultResourceBindings`)
            ])
            .filter(({ id }) => !knownIds.has(id))
            .map(({ path, id }) => `${path} = ${id}`);

        expect(missing).toEqual([]);
    });
});
