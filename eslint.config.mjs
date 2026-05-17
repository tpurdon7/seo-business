import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "audit-mac-app/dist/**",
    "audit-mac-app/node_modules/**",
    "audit-mac-app/src-tauri/target/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
