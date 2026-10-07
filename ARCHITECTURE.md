# Architecture

This document explains what `altinn-studio-custom-components-docs` is, how it is built, and how it fits into the wider custom-components ecosystem.
It is aimed at developers who maintain or extend the documentation site.

For how to run it and contribute, see [CONTRIBUTING](./CONTRIBUTING.md).

---

## 1. What this package is

The **public documentation site and component gallery** for [`@arkitektum/altinn-studio-custom-components`](https://github.com/Arkitektum/altinn-studio-custom-components).
It renders every custom component with example (dummy) data, alongside the markup, data model, and text resources used to produce it.

The site is published with **GitHub Pages**: <https://arkitektum.github.io/altinn-studio-custom-components-docs/>

---

## 2. How it works

The site is a static page built by Webpack.
It imports the **published** custom components and renders each example in the browser — there is no server.

That is the whole of its relationship with the other repositories: it pins `@arkitektum/altinn-studio-custom-components` and `@arkitektum/altinn-studio-custom-components-utils` from npm and nothing else. It does not talk to the statistics API, which is a local dev tool for the components repository, and it has nothing to do with `altinn-studio-api-tools`. An example here can only show what the pinned versions can render, which is why documenting an unreleased component means bumping the dependency first.

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

1. combines the component's `markup` with its example `formData`,
2. builds `CustomElementHtmlAttributes` and calls `createCustomElement(tagName, …)` (from the utils package),
3. wraps the result in a container and shows it next to the syntax-highlighted markup (via **highlight.js**).

Examples are grouped by component type for the sidebar (see `src/constants/componentTypeNames.ts`).

---

## 3. Source layout

```text
src/
├── index.html               # Page shell (Webpack template)
├── index.ts                 # Entry: imports the components, builds and renders all examples
├── types.ts                 # ComponentMarkup and ComponentExample, which every example satisfies
├── components/
│   ├── index.ts             # Aggregates every example
│   ├── field/               # One file per component example, each exporting a `markup` object
│   ├── table/               #   (custom-field-data.ts, custom-table-part.ts, ...)
│   ├── group/  grouplist/  list/  description-list/  matrix/  summation/  typography/  layout/
├── data/
│   ├── dataModels.ts        # Example form data referenced by the examples
│   └── textResources.ts     # Example text-resource values (nb)
├── constants/
│   ├── componentNames.ts
│   └── componentTypeNames.ts # Display names per component type (Felt, Tabell, Gruppe, ...)
├── scripts/
│   ├── renderers.ts         # Renders the sidebar and the results
│   └── helpers.ts
├── styles/main.css
└── fonts/ assets/

docs/                        # Build output, published to GitHub Pages by CI (git-ignored)
```

A component **example** is just a module exporting a `markup` object — the component's tag name plus the attributes/bindings that drive the demo. For example (`src/components/field/custom-field-data.ts`, shortened):

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

The `satisfies` checks are what make a misspelt attribute or binding a type error, which is why an example has to be a `.ts` file.

---

## 4. Build & deploy

| Command      | What it does                       |
| ------------ | ---------------------------------- |
| `yarn start` | Webpack dev server on port `9000`. |
| `yarn build` | Production build into `docs/`.     |

The build output goes to **`docs/`** (git-ignored). A production build also prerenders the page: `PrerenderPlugin` in `webpack.config.js` runs the built bundle once in jsdom and writes the resulting DOM into `index.html`, so crawlers that do not run JavaScript still see every example and sidebar link. The client renders again over that markup on load. A failed prerender is a warning, not an error, and ships the client-rendered page. `SeoFilesPlugin` writes `robots.txt` and `sitemap.xml` alongside. The `Deploy` GitHub Actions workflow builds the site and publishes it to GitHub Pages on every push to `main`, so `docs/` no longer needs to be built or committed by hand. Pages is configured with **Source: GitHub Actions**.

**Tooling:** TypeScript (checked by `tsc --noEmit`, stripped by Babel), Webpack 5 (with `html-webpack-plugin`, `mini-css-extract-plugin`, `css-minimizer-webpack-plugin`), jsdom for the prerender, highlight.js, Jest, ESLint (flat config), Prettier, Yarn 4 via Corepack.
CI runs lint, the format check, the typecheck, the tests and the build on pull requests (`build.yml`) and again before publishing (`deploy.yml`), and an ESLint scan (`eslint.yml`) that uploads results to the GitHub Security tab.

---

## 5. Relationship to the other packages

- It consumes the **published** `@arkitektum/altinn-studio-custom-components` and `@arkitektum/altinn-studio-custom-components-utils` from npm — it does not contain component logic itself.
- When a new component is added to the components package, an example should be added here (see [CONTRIBUTING](./CONTRIBUTING.md)).
- To document changes from an unreleased components version, bump the dependency to that version first.
