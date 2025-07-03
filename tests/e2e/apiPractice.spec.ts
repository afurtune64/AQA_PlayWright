import test, { expect } from "@playwright/test";
import { HomePage } from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
import { usersList } from "../../test-data/users";
import AuthController from "../../api/controllers/AuthControllers";
import { time } from "console";

let homePage: HomePage;
let signInForm: SignInForm;
let authController: AuthController;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  signInForm = new SignInForm(page);
});

// test("Mock response", async ({ page }) => {
//   await homePage.open();
//   await homePage.clickSignInButton();
//   // await page.route('/api/cars', route => route.fulfill({
//   //     status: 500,
//   //     body: '',
//   // }));

//   await page.route("**/api/cars", async (route) => {
//     await route.fulfill({
//       status: 404,
//       contentType: "text/plain",
//       body: "Not Found!",
//     });
//   });

//   await signInForm.loginWithCredentials(
//     usersList.mainUser.email,
//     usersList.mainUser.password
//   );
//   await expect(
//     page.getByText("You don’t have any cars in your garage")
//   ).toBeVisible();
// });

test("Mock response. Profile page", async ({ page }) => {
  await homePage.open();
  await homePage.clickSignInButton();

  const mockedUser = {
    name: "Stanislav",
    lastName: "Taran",
    photo: "user-1621352948859.jpg",
    userId: 25,
  };
  await page.context().route("**/api/users/profile", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ status: "ok", profile: mockedUser }),
    });
  });
  await signInForm.loginWithCredentials(
    usersList.mainUser.email,
    usersList.mainUser.password
  );
  //await page.waitForTimeout(4000);

  await page.locator("a.sidebar_btn.-profile").click();
  await expect(page.getByText("Stanislav Taran")).toBeVisible();
});

test("Mock response. Profile page ", async ({ page }) => {
  await homePage.open();
  await homePage.clickSignInButton();

  await page.route("**/api/users/profile", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        status: "ok",
        profile: {
          userId: 33,
          photo: "user-1621352948859.jpg",
          name: "Stanislav",
          lastName: "Taran",
        },
      }),
    });
  });
  await signInForm.loginWithCredentials(
    usersList.mainUser.email,
    usersList.mainUser.password
  );
  await page.locator("a.sidebar_btn.-profile").click();
  await expect(page.getByText("Stanislav Taran")).toBeVisible();
});
