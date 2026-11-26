# altinn-studio-custom-components-docs

The documentation site and component gallery for [`@arkitektum/altinn-studio-custom-components`](https://github.com/Arkitektum/altinn-studio-custom-components). It renders every custom component with example data, alongside the markup, data model and text resources used to produce it.

Live site: <https://arkitektum.github.io/altinn-studio-custom-components-docs/>

## Getting started

Prerequisites: Node.js 24 and Yarn 4 via [Corepack](https://nodejs.org/api/corepack.html) (run `corepack enable` once, and the Yarn version in `package.json` is activated automatically).

```bash
git clone https://github.com/Arkitektum/altinn-studio-custom-components-docs.git
cd altinn-studio-custom-components-docs
yarn install
yarn start
```

Open <http://localhost:9000>. The page reloads on change.

`yarn build` writes the production build to `docs/` (git-ignored). The `Deploy` GitHub Actions workflow builds the site and publishes it to GitHub Pages on every push to `main`.

## How it works

The site is a static page that imports the published custom components and renders each example in the browser. Each example is a module under `src/components/<type>/` that exports a `markup` object (the component's tag name plus its attributes and bindings), with supporting data in `src/data/dataModels.ts` and `src/data/textResources.ts`.

## Resources

- [Architecture overview](./ARCHITECTURE.md): the build and render flow
- [Contributing guide](./CONTRIBUTING.md): commands and how to add a component example
- [Security policy](./SECURITY.md)
- [Custom components](https://github.com/Arkitektum/altinn-studio-custom-components): the components this gallery shows
- [Shared utils](https://github.com/Arkitektum/altinn-studio-custom-components-utils): `createCustomElement` and the tag-name allow-list

## Licence

[MIT](./LICENSE)
