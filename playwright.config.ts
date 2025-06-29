import { PlaywrightTestConfig, devices } from "@playwright/test";

require("dotenv").config();

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 30 * 1000,
  retries: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.BASIC_AUTH_USERNAME!,
      password: process.env.BASIC_AUTH_PASSWORD!,
    },
    browserName: "chromium",
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "*/setup/**.ts",
    },
    {
      name: "smoke",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: "*/setup/**.ts",
      dependencies: ["setup"],
    },
  ],
};
export default config;
