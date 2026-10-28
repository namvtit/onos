import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 45000, expect: { timeout: 10000 },
  fullyParallel: false, workers: 2,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'audit/final/playwright-report' }], ['json', { outputFile: 'audit/final/playwright-results.json' }]],
  outputDir: 'audit/final/test-results',
  use: { baseURL: 'http://127.0.0.1:3000', browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: { command: 'npm run start', url: 'http://127.0.0.1:3000', reuseExistingServer: true, timeout: 60000 },
});
