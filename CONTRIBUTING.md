# Contributing

Set up and run the site as described in the [README](./README.md). For how the site is built and rendered, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Commands

| Command             | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `yarn start`        | Webpack dev server on port `9000`.                        |
| `yarn build`        | Production build into `docs/`.                            |
| `yarn lint`         | Lint with ESLint (flat config in `eslint.config.mjs`).    |
| `yarn format`       | Format with Prettier.                                     |
| `yarn format:check` | Check formatting with Prettier.                           |
| `yarn typecheck`    | Type-check with `tsc --noEmit`.                           |
| `yarn test`         | Run the Jest tests, including the checks on the examples. |

## Adding or updating a component example

1. Add an example module under `src/components/<type>/<component-tag-name>.ts` that exports a `markup` object: the component's `tagName` plus the attributes, `dataModelBindings` and `resourceBindings` that drive the demo. Use an existing file in the same folder as a template and keep its `satisfies ComponentMarkup` and `satisfies ComponentExample`, which type-check the example.

2. Register it by importing the new module in `src/components/index.ts`, under the right type.

3. Add supporting data if the example needs it: form data in `src/data/dataModels.ts`, text-resource values in `src/data/textResources.ts`. Use synthetic example data only, never real or personal data.

4. Check what the "Prøv selv" panel offers for it. The panel builds its fields from the example, so the example decides what a reader can try:
    - It offers a markup flag (`size`, `hideTitle`, `hideIfEmpty`, `inline`, `hideOrgNr`, `enableLinks`) only if the markup sets it. Set a flag the component reads, to its default if need be, to make it adjustable.
    - It picks each field by the type of the example value. Give values their real type rather than null, or the panel can only offer a text field.
    - It adds list items by copying one, so give a list at least one item.

5. Name it in `src/constants/componentNames.ts`, or the sidebar shows its tag name. A new component type also needs a display name in `src/constants/componentTypeNames.ts`.

6. Run `yarn test`. The tests in `src/components/` check that:
    - every component the package ships (`customElementTagNames` from the utils package) has an example, or is listed with its reason in `src/components/componentsWithoutExamples.ts`,
    - each example binds exactly the `dataModelBindings` keys its component reads, as listed in the components package's `dataModelBindingKeys.json`,
    - every `resource.` id an example names exists in `src/data/textResources.ts` or in the components package's `resource.nb.json`.

7. Verify with `yarn start` that the example renders, and open its "Prøv selv" panel to check the fields make sense.

The site renders the published components package. To document a component or change that is not released yet, bump `@arkitektum/altinn-studio-custom-components` (and `-utils` if needed) to the target version first.

## Coding conventions

- ES modules throughout.
- JSDoc on exported functions.
- Formatting and linting via Prettier (`.prettierrc`) and ESLint (`eslint.config.mjs`).
- Keep example modules declarative: just the `markup` and supporting data.

## Pull requests

1. Branch off `main`.
2. Keep changes focused.
3. Open a PR against `main`. The Build workflow (lint, format check, typecheck, tests and build) must be green before merge.

Merging to `main` publishes the site.
