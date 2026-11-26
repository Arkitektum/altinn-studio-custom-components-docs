import { describe, expect, it } from "@jest/globals";

// This repository's TypeScript has no Node types, so the one Node function used here is declared with the shape it is used in.
declare const __dirname: string;
declare function require(id: "node:fs"): { readFileSync(path: string, encoding: "utf8"): string };
const { readFileSync } = require("node:fs");

/**
 * Checks this repository's row in the "Related repositories" table against package.json: the name it is published as, and the @arkitektum packages it depends on. The same table is in all seven repositories, and each checks its own row.
 */
const REPOSITORY = "altinn-studio-custom-components-docs";

interface Manifest {
    name: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
}

const markdown = readFileSync(`${__dirname}/../ARCHITECTURE.md`, "utf8");
const manifest: Manifest = JSON.parse(readFileSync(`${__dirname}/../package.json`, "utf8"));
const manifests = [manifest];

/** The cells of the given repository's row, keyed by column heading, and the repositories the table lists. */
function relatedRepositoriesTable(text: string, repository: string): { row: Record<string, string>; repositories: string[] } {
    const section = text.split(/^## (?:\d+\. )?Related repositories$/m)[1]?.split(/^## /m)[0] ?? "";
    const rows = section
        .split("\n")
        .filter((line) => line.startsWith("|"))
        .map((line) =>
            line
                .split("|")
                .slice(1, -1)
                .map((cell) => cell.trim())
        );
    const [header = [], , ...body] = rows;
    const cells = body.find((row) => row[0] === `\`${repository}\``) ?? [];
    return {
        row: Object.fromEntries(header.map((heading, index) => [heading, cells[index] ?? ""])),
        repositories: body.map((row) => namesIn(row[0] ?? "")[0] ?? "")
    };
}

/** The names written in backticks in a table cell. */
function namesIn(cell: string): string[] {
    return [...cell.matchAll(/`([^`]+)`/g)].map((match) => match[1] ?? "");
}

/** The @arkitektum packages the package.json files depend on, as the table names them: by repository when the table lists one, else by package name. */
function arkitektumDependencies(packageFiles: Manifest[], repositories: string[]): string[] {
    const names = packageFiles.flatMap((file) => Object.keys({ ...file.dependencies, ...file.devDependencies, ...file.peerDependencies }));
    const scope = "@arkitektum/";
    const documented = names
        .filter((name) => name.startsWith(scope))
        .map((name) => (repositories.includes(name.slice(scope.length)) ? name.slice(scope.length) : name));
    return [...new Set(documented)].sort();
}

describe("the Related repositories table", () => {
    const { row, repositories } = relatedRepositoriesTable(markdown, REPOSITORY);

    it("has a row for this repository", () => {
        expect(row["Repository"]).toBe(`\`${REPOSITORY}\``);
    });

    it("names the package this repository publishes", () => {
        if (manifest.name.startsWith("@arkitektum/")) {
            expect(row["Published as"]).toBe(`\`${manifest.name}\``);
        } else {
            expect(row["Published as"]).toMatch(/^Not published/);
        }
    });

    it("lists the @arkitektum packages this repository depends on", () => {
        expect(namesIn(row["Depends on"] ?? "").sort()).toEqual(arkitektumDependencies(manifests, repositories));
    });
});
