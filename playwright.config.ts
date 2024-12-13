/* eslint-disable import/no-unused-modules */
import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const baseUrl = process.env.PLAYWRIGHT_BASE_URL
export const GLOBAL_TIMEOUT = 1 * 60 * 1000

// Define base projects
const baseProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
]

// Add Safari project only in CI
if (process.env.CI) {
  baseProjects.push({
    name: 'safari',
    use: { ...devices['Desktop Safari'] },
  })
}

const config: PlaywrightTestConfig = {
  globalSetup: './tests/playwrightSetup.ts',
  testDir: 'tests/suites',
  timeout: GLOBAL_TIMEOUT,
  outputDir: './playwright-artifacts/test-results',
  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: './playwright-artifacts/playwright-report',
      },
    ],
    ['json', { outputFile: './playwright-artifacts/test-results.json' }],
    ['junit', { outputFile: './playwright-artifacts/junit.xml' }],
  ],
  retries: 2,
  // If there is no url provided, playwright starts webServer with the app in dev mode
  webServer: baseUrl
    ? undefined
    : {
      command: 'npm run dev',
      port: 3000,
    },
  use: {
    baseURL: baseUrl || 'http://localhost:3000/',
    testIdAttribute: 'data-qa',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    //headless: false,
  },
  projects: baseProjects,
}

export default config
