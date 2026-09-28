import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
    js.configs.recommended,
    // Scoped to TypeScript on purpose. Applied to everything, these rules reach the CommonJS config files at the
    // root, where `require()` is the only thing that works.
    ...tseslint.configs.recommended.map((config) => ({ ...config, files: ["**/*.ts"] })),
    {
        // A type argument on a call or a `new` is written out of the source by the type checker but not always by the
        // transform, and when it survives it is still valid JavaScript: `el.querySelectorAll<T>(sel)` parses as
        // `(querySelectorAll < T) > (sel)` and answers with a boolean. That took three of the four jest suites here
        // down, one of them silently: seven tests failed pointing at assertions that were correct all along. Write the
        // type as an annotation instead: `const m: Map<K, V> = new Map()`.
        files: ["**/*.ts"],
        rules: {
            "no-restricted-syntax": [
                "error",
                {
                    selector: "CallExpression > TSTypeParameterInstantiation",
                    message: "Do not put a type argument on a call. Annotate the variable instead: `const m: Map<K, V> = new Map()`."
                },
                {
                    selector: "NewExpression > TSTypeParameterInstantiation",
                    message: "Do not put a type argument on `new`. Annotate the variable instead: `const m: Map<K, V> = new Map()`."
                }
            ]
        }
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        plugins: { js },
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
        rules: {
            "sort-imports": [
                "error",
                {
                    allowSeparatedGroups: true
                }
            ]
        }
    },
    {
        ignores: ["dist/**", "docs/**", "node_modules/", "**/vendor/*.js"]
    },
    {
        files: ["**/*.test.{js,ts}", "**/*.spec.{js,ts}"], // 👈 Only apply to test files
        languageOptions: {
            globals: {
                ...globals.jest // 👈 Add Jest globals like `describe`, `it`, `expect`
            }
        },
        rules: {
            // Optional: Jest-specific rules
            "no-undef": "off" // Jest defines globals, so we disable this warning
        }
    }
]);
