import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.E2E_BASE_URL || 'http://127.0.0.1:4323';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Software WebGL shares the cloud CPU/GPU budget; keep browser tests serial.
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  outputDir: 'test-results',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    contextOptions: { reducedMotion: 'reduce' },
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', viewport: { width: 390, height: 844 } } },
    { name: 'map-wide-phone', testMatch: '**/main-map.spec.ts', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', viewport: { width: 430, height: 932 } } },
    { name: 'map-landscape', testMatch: '**/main-map.spec.ts', use: { ...devices['iPhone 13 landscape'], defaultBrowserType: 'chromium', viewport: { width: 844, height: 390 } } },
  ],
  webServer: process.env.E2E_BASE_URL ? undefined : {
    command: 'npm run preview -- --host 127.0.0.1 --port 4323 --outDir ./artifacts/dist',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
  },
});
