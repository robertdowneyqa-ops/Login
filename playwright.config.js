// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: ['login.spec.js'],
  timeout: 30_000,
  expect: { timeout: 15_000 },
  use: {
    headless: true,
    viewport: { width: 1536, height: 864 },
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [['list']]
});
