# Architecture

How `altinn-studio-custom-components-docs` is built and rendered, for developers who maintain or extend the site. For what the site is and how to run it, see the [README](./README.md). For adding examples, see [CONTRIBUTING](./CONTRIBUTING.md).

## How it works

The site is a static page built by Webpack. It depends on the published `@arkitektum/altinn-studio-custom-components` and `@arkitektum/altinn-studio-custom-components-utils` from npm and contains no component logic itself. An example can only show what the pinned versions can render, so documenting an unreleased component means bumping the dependency first.

```text
  @arkitektum/altinn-studio-custom-components  (main.js + main.css + resource.nb.json)
  @arkitektum/altinn-studio-custom-components-utils  (createCustomElement, ...)
                         │
                         ▼
   src/index.ts  ──▶ for each example: build attributes ─▶ createCustomElement ─▶ render preview
                         │
                         ├─ src/components/**      example "markup" per component
                         ├─ src/data/dataModels.ts example form data
                         └─ src/data/textResources.ts example resource values
                         │
                         ▼
            Webpack build  ─▶  docs/  (served by GitHub Pages)
```

For each example, `src/index.ts`:

1. combines the component's `markup` with its example form data,
2. builds `CustomElementHtmlAttributes` and calls `createCustomElement(tagName, …)` from the utils package,
3. wraps the result in a container and shows it next to the markup, highlighted by highlight.js.

Examples are grouped by component type in the sidebar, with display names from `src/constants/componentTypeNames.ts` and `src/constants/componentNames.ts`.

### The "Prøv selv" panel

Below each preview is a closed panel that lets a reader change the example and see the component render with it. Everything it offers is read off the example's markup and data:

- Data fields: one per value in the example's data, by the type of the example value (text field, number field, or a Ja / Nei / Tom select for booleans). Groups and lists become fieldsets. A null value gets a text field.
- Empty states: every group and list has a Tom checkbox that sets it to null, to show `emptyFieldText` and `hideIfEmpty` at work.
- Lists: items can be removed, and added as a copy of the last one (or of the example's first once the list is empty).
- Markup flags: `size`, `hideTitle`, `hideIfEmpty`, `inline`, `hideOrgNr` and `enableLinks`, but only those the example's markup sets.
- Tilbakestill puts back the example's own markup and data.

Every edit makes a changed copy and passes it to `renderPreview` (set on each result by `getResults`), which builds a fresh preview. `updateComponentExample` swaps that preview in and rewrites the Markup and Data blocks, so they always show what is rendered. A preview that fails to render shows the same error box a broken example does. The fields are built the first time a panel is opened.

## Source layout

```text
src/
├── index.html               # Page shell (Webpack template)
├── index.ts                 # Entry: imports the components, builds and renders all examples
├── types.ts                 # ComponentMarkup and ComponentExample, which every example satisfies
├── components/
│   ├── index.ts             # Aggregates every example
│   ├── componentsWithoutExamples.ts # Shipped components that deliberately have no example, by reason
│   ├── *.test.ts            # Checks the examples against what the components package ships
│   ├── field/               # One file per component example, each exporting a `markup` object
│   ├── table/               #   (custom-field-data.ts, custom-table-part.ts, ...)
│   ├── group/  grouplist/  list/  description-list/  matrix/  summation/  typography/  layout/
├── data/
│   ├── dataModels.ts        # Example form data referenced by the examples
│   └── textResources.ts     # Example text-resource values (nb)
├── constants/
│   ├── componentNames.ts     # Display names per component tag name
│   └── componentTypeNames.ts # Display names per component type (Felt, Tabell, Gruppe, ...)
├── scripts/
│   ├── renderers.ts         # Renders the sidebar and the results
│   ├── playgroundRenderers.ts # The "Prøv selv" panel's fields
│   ├── playground.ts        # The panel's data side: field kinds, changed copies, which markup flags to offer
│   ├── highlight.ts         # highlight.js, set up for JSON, and highlighting a block again after an edit
│   └── helpers.ts
├── styles/main.css
└── fonts/ assets/

docs/                        # Build output, published to GitHub Pages by CI (git-ignored)
```

A component example is a module exporting a `markup` object: the component's tag name plus the attributes and bindings that drive the demo. For example (`src/components/field/custom-field-data.ts`, shortened):

```ts
import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "customField-data",
    type: "Custom",
    tagName: "custom-field-data",
    dataModelBindings: { simpleBinding: "customField.data" },
    resourceBindings: {
        title: "resource.customField.data.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
} satisfies ComponentMarkup;

export default { markup } satisfies ComponentExample;
```

The `satisfies` checks make a misspelt attribute or binding a type error.

## Build and deploy

A production build (`yarn build`) writes to `docs/` and also prerenders the page: `PrerenderPlugin` in `webpack.config.js` runs the built bundle once in jsdom and writes the resulting DOM into `index.html`, so crawlers that do not run JavaScript still see every example and sidebar link. The client renders again over that markup on load. A failed prerender is a warning and ships the client-rendered page. `SeoFilesPlugin` writes `robots.txt` and `sitemap.xml` alongside.

The `Deploy` workflow (`deploy.yml`) runs lint, the format check, the typecheck, the tests and the build, then publishes `docs/` to GitHub Pages on every push to `main`. Pages is configured with Source: GitHub Actions. `build.yml` runs the same checks on pull requests, and `eslint.yml` uploads an ESLint scan to the GitHub Security tab.

Tooling: TypeScript (checked by `tsc --noEmit`, stripped by Babel), Webpack 5 (with `html-webpack-plugin`, `mini-css-extract-plugin`, `css-minimizer-webpack-plugin`), jsdom for the prerender, highlight.js, Jest, ESLint (flat config), Prettier, Yarn 4 via Corepack.
