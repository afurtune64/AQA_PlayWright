import { test } from "@playwright/test";
import { HomePage } from "../pom/pages/HomePage";
import { RegistrationPage } from "../pom/pages/RegistrationPage";

test.describe("example to-do app", () => {
  let homePage: HomePage;
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
    await homePage.navigate();
    await homePage.clickSignUp();
    await registrationPage.ensureModalVisible();
  });

  // Name validation
  test("Name. by empty input", async () => {
    await registrationPage.fillName("");
    await registrationPage.expectNameError("Name required");
  });

  test("Name. by wrong data", async () => {
    await registrationPage.fillName("@#");
    await registrationPage.expectNameError("Name is invalid");
  });

  test("Name. by special characters", async () => {
    const specialChars = ["@", "#", "$", "%"];
    for (const char of specialChars) {
      await registrationPage.fillName(`x${char}`);
      await registrationPage.expectNameError("Name is invalid");
    }
  });

  test("Name. by less than 2 symbols", async () => {
    await registrationPage.fillName("x");
    await registrationPage.expectNameError(
      "Name has to be from 2 to 20 characters long"
    );
  });

  test("Name. by more than 20 symbols", async () => {
    await registrationPage.fillName("x".repeat(21));
    await registrationPage.expectNameError(
      "Name has to be from 2 to 20 characters long"
    );
  });

  test("Name. by only the EN alphabet", async () => {
    await registrationPage.fillName("Аліна");
    await registrationPage.expectNameError("Name is invalid");
  });

  test("Name. by ignored spaces", async () => {
    const inputValue = "  Alina ";
    await registrationPage.fillName(inputValue.trim());
    await registrationPage.expectNameValid("Alina");
  });

  test("Name. by correct data", async () => {
    const inputValue = "Alina";
    await registrationPage.fillName(inputValue);
    await registrationPage.expectNameValid(inputValue);
  });

  // Last name validation
  test("Last name. by empty input", async () => {
    await registrationPage.fillLastName("");
    await registrationPage.expectLastNameError("Last name required");
  });

  test("Last name. by wrong data", async () => {
    await registrationPage.fillLastName("@#");
    await registrationPage.expectLastNameError("Last name is invalid");
  });

  test("Last name. by special characters", async () => {
    const specialChars = ["@", "#", "$", "%"];
    for (const char of specialChars) {
      await registrationPage.fillLastName(`x${char}`);
      await registrationPage.expectLastNameError("Last name is invalid");
    }
  });

  test("Last name. by less than 2 symbols", async () => {
    await registrationPage.fillLastName("x");
    await registrationPage.expectLastNameError(
      "Last name has to be from 2 to 20 characters long"
    );
  });

  test("Last name. by more than 20 symbols", async () => {
    await registrationPage.fillLastName("x".repeat(21));
    await registrationPage.expectLastNameError(
      "Last name has to be from 2 to 20 characters long"
    );
  });

  test("Last name. by only the EN alphabet", async () => {
    await registrationPage.fillLastName("Фуртуне");
    await registrationPage.expectLastNameError("Last name is invalid");
  });

  test("Last name. by ignored spaces", async () => {
    const inputValue = "  Furtune ";
    await registrationPage.fillLastName(inputValue.trim());
    await registrationPage.expectLastNameValid("Furtune");
  });

  test("Last name. by correct data", async () => {
    const inputValue = "Furtune";
    await registrationPage.fillLastName(inputValue);
    await registrationPage.expectLastNameValid(inputValue);
  });

  // Email validation
  test("Email. by empty field", async () => {
    await registrationPage.fillEmail("");
    await registrationPage.expectEmailError("Email required");
  });

  test("Email. by wrong data", async () => {
    await registrationPage.fillEmail("alinatest.com");
    await registrationPage.expectEmailError("Email is incorrect");
  });

  test("Email. by correct data", async () => {
    const inputValue = "alina@test.com";
    await registrationPage.fillEmail(inputValue);
    await registrationPage.expectEmailValid(inputValue);
  });

  // Password validation
  test("Password. by empty field", async () => {
    await registrationPage.fillPassword("");
    await registrationPage.expectPasswordError("Password required");
  });

  test("Password. by less than 8 symbols", async () => {
    await registrationPage.fillPassword("1".repeat(5));
    await registrationPage.expectPasswordError(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("Password. by more than 15 symbols", async () => {
    await registrationPage.fillPassword("1".repeat(16));
    await registrationPage.expectPasswordError(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("Password. by correct data", async () => {
    const inputValue = "Test123!";
    await registrationPage.fillPassword(inputValue);
    await registrationPage.expectPasswordValid(inputValue);
  });

  // Re-enter password validation
  test("Re-enter password. by empty field", async () => {
    await registrationPage.fillRepeatPassword("");
    await registrationPage.expectRepeatPasswordError(
      "Re-enter password required"
    );
  });

  test("Re-enter password. by password do not match", async () => {
    await registrationPage.fillPassword("Test123!");
    await registrationPage.fillRepeatPassword("Test1234!");
    await registrationPage.expectRepeatPasswordError("Passwords do not match");
  });

  test("Re-enter password. by passwords matches", async () => {
    const inputValue = "Test123!";
    await registrationPage.fillPassword(inputValue);
    await registrationPage.fillRepeatPassword(inputValue);
    await registrationPage.expectRepeatPasswordValid(inputValue);
  });

  // Register button validation
  test("Register button. by disabled state", async () => {
    await registrationPage.expectRegisterButtonDisabled();
  });

  test("Register button. by success registration", async () => {
    const email = `aqa-alina.test+1${Date.now()}@test.com`;
    await registrationPage.fillRegistrationForm({
      name: "Alina",
      lastName: "Furtune",
      email,
      password: "Test1234!@",
      repeatPassword: "Test1234!@",
    });
    await registrationPage.expectRegisterButtonEnabled();
    await registrationPage.clickRegister();
    await registrationPage.expectPanelLayoutVisible();
  });
});
