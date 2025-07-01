//import test from "@playwright/test";
import { GaragePage } from "../pom/pages/GaragePage";
import SignInForm from "../pom/forms/SignInForm";
import { HomePage } from "../pom/pages/HomePage";
import { usersList } from "../../test-data/users";
import { test } from "../../fixtures/userGaragePage";

// let garagePage: GaragePage;
// let signInForm: SignInForm;
// let homePage: HomePage;

// test.describe("Garage Page Tests", () => {
//   test.use({ storageState: "test-data/states/mainUserState.json" });
//   test.beforeEach(async ({ page }) => {
//     garagePage = new GaragePage(page);
//     signInForm = new SignInForm(page);
//     homePage = new HomePage(page);

// await homePage.open();
// await homePage.clickSignInButton();
// await signInForm.loginWithCredentials(
//   usersList.mainUser.email,
//   usersList.mainUser.password
// );
// await garagePage.verifyPageIsOpened();
//     await garagePage.open();
//   });

//   test("Add BMW X5 to Garage", async () => {
//     await garagePage.addNewCar("BMW", "X5", "333");
//     await garagePage.verifyLastAddedCarName("BMW X5");
//   });
// });

test.describe("Garage Page Tests with fixtures", () => {});
test("Add new car using userGaragePage fixtures", async ({
  userGaragePage,
}) => {
  await userGaragePage.addNewCar("Porsche", "911", "25");
  await userGaragePage.verifyLastAddedCarName("Porsche 911");
});
