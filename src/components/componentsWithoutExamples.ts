/**
 * Components deliberately without an example of their own: the primitives the data components are built out of.
 * They take their content from attributes rather than from a data model, so an example would demonstrate the
 * wrapper rather than anything a form author would write.
 */
export const PRIMITIVES_WITHOUT_EXAMPLES = [
    "custom-description-list",
    "custom-divider",
    "custom-feedback",
    "custom-field",
    "custom-header",
    "custom-list",
    "custom-matrix",
    "custom-paragraph",
    "custom-summation",
    "custom-table"
];

/**
 * Components that exist for other components to build with, rather than for a form author to write. The feedback
 * stack is three deep — validation messages builds a feedback list, which builds one feedback item per message — and
 * an app names none of them.
 */
export const BUILT_BY_OTHER_COMPONENTS = ["custom-feedback-data", "custom-feedbacklist-data", "custom-feedbacklist-validation-messages"];

/**
 * On their way out, so an example would document something nobody should start using:
 *
 *   custom-field-grid, custom-field-row   being replaced by custom-matrix, which custom-matrix-data already shows
 *   custom-field-image                    being replaced by custom-image, which has not shipped yet
 *   custom-header-text-data               unused, and to be removed
 *
 * These still ship, so they are listed here rather than simply absent. When one is finally dropped from the package,
 * "lists only components that are still shipped" in index.test.ts fails — which is the reminder to delete its line.
 */
export const SUPERSEDED = ["custom-field-grid", "custom-field-image", "custom-field-row", "custom-header-text-data"];

/** Everything the package ships that is deliberately not demonstrated, whatever the reason. */
export const WITHOUT_EXAMPLES = [...PRIMITIVES_WITHOUT_EXAMPLES, ...BUILT_BY_OTHER_COMPONENTS, ...SUPERSEDED];
