import { test as base } from "@playwright/test";
import { GaragePage } from "../tests/pom/pages/GaragePage";
import { HomePage } from "../tests/pom/pages/HomePage";

type MyFixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "test-data/states/mainUserState.json",
    });
    const page = await context.newPage();
    const garagePage = new GaragePage(page);
    await garagePage.open();
    await use(garagePage);
    await context.close();
  },
});

export { expect } from "@playwright/test";
