# altinn-studio-custom-components-docs

The **documentation site and component gallery** for [`@arkitektum/altinn-studio-custom-components`](https://github.com/Arkitektum/altinn-studio-custom-components).
It renders every custom component with example (dummy) data, alongside the markup, data model, and text resources used to produce it.

**Live site: <https://arkitektum.github.io/altinn-studio-custom-components-docs/>**

---

## Getting started

### Prerequisites

- **Node.js 24**
- **Yarn 4** via [Corepack](https://nodejs.org/api/corepack.html) — run `corepack enable` once.

### Run locally

```bash
git clone https://github.com/Arkitektum/altinn-studio-custom-components-docs.git
cd altinn-studio-custom-components-docs
yarn install
yarn start
```

Open <http://localhost:9000>.
The page renders every component example with live previews and reloads on change.

### Build

```bash
yarn build
```

The production build is written to `docs/`, which **GitHub Pages serves directly from the `main` branch**.
Updating the live site means rebuilding and committing the `docs/` folder.

---

## How it works

The site imports the **published** custom components and renders each example in the browser — there is no backend.
Each example is a module under `src/components/<type>/` that exports a `markup` object (the component's tag name plus its attributes and bindings), with supporting data in `src/data/dataModels.js` and `src/data/textResources.js`.

To add a component example, see [CONTRIBUTING.md](./CONTRIBUTING.md).
For the full build/render flow, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Resources

- [Architecture overview](./ARCHITECTURE.md)
- [Contributing guide](./CONTRIBUTING.md)
- [Security policy](./SECURITY.md)
- [Custom components](https://github.com/Arkitektum/altinn-studio-custom-components)
- [Shared utils](https://github.com/Arkitektum/altinn-studio-custom-components-utils)
