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
