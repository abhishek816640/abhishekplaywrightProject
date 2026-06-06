// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  reporter : [["line"], ["allure-playwright"]],
  retries : 2,
  workers : 1,
  projects: [
    {
      name: 'safari',
      use: {
        headless: true,
        browserName: 'webkit',
        screenshot: 'on',
        trace: 'on',
        ...devices['iPhone 15 Pro Max']
      }
    },
    {
      name: 'chromebrowser',
      use: {
        headless: false,
        browserName: 'chromium',
        screenshot: 'on',
        trace: 'on',
        viewport : {width:1500,height:1500},
        ignoreHTTPSErrors : true,
        permissions : ['geolocation']
      }
    }
  ]

});

