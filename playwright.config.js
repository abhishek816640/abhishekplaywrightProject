// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout : 40*1000,
  reporter: [["line"], ["allure-playwright"]],
    use: {
     headless: true,
    browserName: 'chromium',
    screenshot: 'on',
    trace: 'on',
  },
 });

