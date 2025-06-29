import { test as base, Page } from "@playwright/test";
import { GaragePage } from "../tests/pom/pages/GaragePage";
import { HomePage } from "../tests/pom/pages/HomePage";
import SignInForm from "../tests/pom/forms/SignInForm";
import { usersList } from "../test-data/users";

type PageFixtures = {
  garagePage: GaragePage;
  garageAsUserWithRemovingCars: GaragePage;
};

export const test = base.extend<PageFixtures>({
  garagePage: async ({ page }, use) => {
    let garagePage = new GaragePage(page);
    await use(garagePage);
  },
  garageAsUserWithRemovingCars: async ({ page }, use) => {
    let homePage = new HomePage(page);
    let signInForm = new SignInForm(page);
    let garagePage = new GaragePage(page);

    await homePage.open();
    await homePage.clickSignInButton();
    await signInForm.loginWithCredentials(
      usersList.mainUser.email,
      usersList.mainUser.password
    );
    await garagePage.verifyPageIsOpened();
    await use(garagePage);
    await page.locator('//span[@class="icon icon-edit"]').first().click();
    await page.locator('//button[@class="btn btn-outline-danger"]').click();
    await page.locator('//button[@class="btn btn-danger"]').click();
  },
});

export { expect } from "@playwright/test";
