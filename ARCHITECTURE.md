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

```text
  @arkitektum/altinn-studio-custom-components  (main.js + main.css + resource.nb.json)
  @arkitektum/altinn-studio-custom-components-utils  (createCustomElement, ...)
                         │
                         ▼
   src/index.js  ──▶ for each example: build attributes ─▶ createCustomElement ─▶ render preview
                         │
                         ├─ src/components/**      example "markup" per component
                         ├─ src/data/dataModels.js example form data
                         └─ src/data/textResources.js example resource values
                         │
                         ▼
            Webpack build  ─▶  docs/  (served by GitHub Pages)
```

For each example, `src/index.js`:

1. combines the component's `markup` with its example `formData`,
2. builds `CustomElementHtmlAttributes` and calls `createCustomElement(tagName, …)` (from the utils package),
3. wraps the result in a container and shows it next to the syntax-highlighted markup (via **highlight.js**).

Examples are grouped by component type for the sidebar (see `src/constants/componentTypeNames.js`).

---

## 3. Source layout

```text
src/
├── index.html               # Page shell (Webpack template)
├── index.js                 # Entry: imports the components, builds and renders all examples
├── components/
│   ├── index.js             # Aggregates every example
│   ├── field/               # One file per component example, each exporting a `markup` object
│   ├── table/                 #   (custom-field-data.js, custom-table-part.js, ...)
│   ├── group/  grouplist/  list/  description-list/  summation/  typography/  layout/
├── data/
│   ├── dataModels.js        # Example form data referenced by the examples
│   └── textResources.js     # Example text-resource values (nb)
├── constants/
│   ├── componentNames.js
│   └── componentTypeNames.js# Display names per component type (Felt, Tabell, Gruppe, ...)
├── scripts/
│   ├── renderers.js         # Renders the sidebar and the results
│   └── helpers.js
├── styles/main.css
└── fonts/ assets/

docs/                        # Build output, published to GitHub Pages by CI (git-ignored)
```

A component **example** is just a module exporting a `markup` object — the component's tag name plus the attributes/bindings that drive the demo. For example (`src/components/field/custom-field-data.js`):

```js
const markup = {
  id: "customField-data",
  type: "Custom",
  tagName: "custom-field-data",
  dataModelBindings: { simpleBinding: "customField.data" },
  resourceBindings: {
    title: "resource.customField.data.title",
    emptyFieldText: "resource.emptyFieldText.default"
  }
};
export default { markup };
```

---

## 4. Build & deploy

| Command | What it does |
| ------- | ------------ |
| `yarn start` | Webpack dev server on port `9000`. |
| `yarn build` | Production build into `docs/`. |

The build output goes to **`docs/`** (git-ignored). The `Deploy` GitHub Actions workflow builds the site and publishes it to GitHub Pages on every push to `main`, so `docs/` no longer needs to be built or committed by hand. Pages is configured with **Source: GitHub Actions**.

**Tooling:** Webpack 5 (with `html-webpack-plugin`, `mini-css-extract-plugin`, `css-minimizer-webpack-plugin`), highlight.js, ESLint (flat config), Yarn 4 via Corepack.
CI runs an ESLint scan (`.github/workflows/eslint.yml`) that uploads results to the GitHub Security tab.

---

## 5. Relationship to the other packages

- It consumes the **published** `@arkitektum/altinn-studio-custom-components` and `@arkitektum/altinn-studio-custom-components-utils` from npm — it does not contain component logic itself.
- When a new component is added to the components package, an example should be added here (see [CONTRIBUTING](./CONTRIBUTING.md)).
- To document changes from an unreleased components version, bump the dependency to that version first.
