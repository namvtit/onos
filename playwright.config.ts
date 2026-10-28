import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests", timeout: 60000, expect: { timeout: 10000 },
  fullyParallel: false, workers: 2, reporter: [["list"], ["html", { open: "never" }], ["json", { outputFile: "audit/qa/interaction-results.json" }]],
  use: { baseURL: "http://127.0.0.1:3000", browserName: "chromium", trace: "retain-on-failure" },
  webServer: { command: "npm run start", url: "http://127.0.0.1:3000", reuseExistingServer: true, timeout: 60000 },
});
