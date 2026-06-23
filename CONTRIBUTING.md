# Contributing

Thanks for contributing to `altinn-studio-custom-components-docs` — the documentation site and component gallery for [`@arkitektum/altinn-studio-custom-components`](https://github.com/Arkitektum/altinn-studio-custom-components).

For an overview of how the site is built and rendered, read [ARCHITECTURE.md](./ARCHITECTURE.md) first.

---

## Prerequisites

- **Node.js 24**
- **Yarn 4**, managed via [Corepack](https://nodejs.org/api/corepack.html). Enable it once:

  ```bash
  corepack enable
  ```

  The correct Yarn version is then activated automatically from the `packageManager` field in `package.json`.

---

## Getting started

1. **Clone and install**

   ```bash
   git clone https://github.com/Arkitektum/altinn-studio-custom-components-docs.git
   cd altinn-studio-custom-components-docs
   yarn install
   ```

2. **Start the dev server**

   ```bash
   yarn start
   ```

   Open <http://localhost:9000>.
   The page renders every component example with live previews and reloads on change.

---

## Everyday commands

| Command | What it does |
| ------- | ------------ |
| `yarn start` | Webpack dev server (port `9000`). |
| `yarn build` | Production build into `docs/` (the published site). |
| `npx eslint .` | Lint the source (ESLint flat config in `eslint.config.mjs`). |

---

## Adding or updating a component example

1. **Add an example module** under `src/components/<type>/<component-tag-name>.js` that exports a `markup` object — the component's `tagName` plus the attributes / `dataModelBindings` / `resourceBindings` that drive the demo. Follow an existing file in the same folder as a template.

2. **Register it** by importing the new module in `src/components/index.js` (grouped under the right type).

3. **Add supporting data** if the example needs it:
   - example form data in `src/data/dataModels.js`,
   - text-resource values in `src/data/textResources.js`.

   Use synthetic/example data only — never real or personal data.

4. **Check the type grouping.**
   If you introduce a new component type, add its display name to `src/constants/componentTypeNames.js`.

5. **Verify** with `yarn start` that the example renders and its markup displays correctly.

> The site renders the **published** components package.
> To document a component or change that isn't released yet, bump `@arkitektum/altinn-studio-custom-components` (and `-utils` if needed) to the target version first.

---

## Coding conventions

- **ES modules** throughout.
- **JSDoc** on exported functions.
- **Formatting & linting** via Prettier (`.prettierrc`) and ESLint (`eslint.config.mjs`).
- Keep example modules declarative — just the `markup` and supporting data.

---

## Pull requests

1. Branch off `main`.
2. Keep changes focused and lint-clean.
3. Run `yarn build` and verify the gallery renders.
4. Open a PR against `main`. The ESLint scan must be green before merge.

---

## Publishing the site

The live site is served by **GitHub Pages** from the `docs/` folder on `main`.
Run `yarn build` and commit the regenerated `docs/` to update <https://arkitektum.github.io/altinn-studio-custom-components-docs/>.
