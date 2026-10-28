import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals, ...nextTs,
  // Preserve the source image sizing/srcsets and native document navigation.
  { rules: { "@next/next/no-img-element": "off", "@next/next/no-html-link-for-pages": "off" } },
  globalIgnores([".next/**", "raw-webflow/**", "public/**", "audit/**", "test-results/**", "playwright-report/**", "next-env.d.ts"]),
]);
