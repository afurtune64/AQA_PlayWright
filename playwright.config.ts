import { PlaywrightTestConfig } from "@playwright/test";

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
      username: process.env.HTTP_USERNAME || "",
      password: process.env.HTTP_PASSWORD || "",
    },
    browserName: "chromium",
  },
};
export default config;
