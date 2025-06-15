import { test, expect } from "@playwright/test";

test.describe("example to-do app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.locator(".modal-body")).toBeVisible();
  });

  // Registration form
  // Name validation
  test("Name. by empty input", async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill("");
    await nameInput.blur();

    await expect(page.getByText("Name required")).toBeVisible();
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Name. by wrong data", async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill("@#");
    await nameInput.blur();
    await expect(page.getByText("Name is invalid")).toBeVisible();
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Name. by special characters", async ({ page }) => {
    const specialChars = ["@", "#", "$", "%"];

    const nameInput = page.locator('input[name="name"]');

    for (const char of specialChars) {
      await nameInput.fill(`x${char}`);
      await nameInput.blur();
      await expect(page.getByText("Name is invalid")).toBeVisible();
      await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    }
  });

  test("Name. by less than 2 symbols", async ({ page }) => {
    const nameInput = page.locator("input[name='name']");
    await nameInput.fill("x");
    await nameInput.blur();
    await expect(
      page.getByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Name. by more than 20 symbols", async ({ page }) => {
    const nameInput = page.locator("input[name='name']");
    await nameInput.fill("x".repeat(21));
    await nameInput.blur();
    await expect(
      page.getByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Name. ny only the EN alphabet", async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill("Аліна");
    await nameInput.blur();
    await expect(page.getByText("Name is invalid")).toBeVisible();
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Name. by ignored spaces", async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const inputValue = "  Alina ";
    await nameInput.fill(inputValue.trim());
    await nameInput.blur();
    await expect(nameInput).toHaveValue("Alina");
  });

  test("Name. by correct data", async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const inputValue = "Alina";
    await nameInput.fill(inputValue);
    await nameInput.blur();
    await expect(nameInput).toHaveValue(inputValue);
    await expect(nameInput).toHaveCSS("border-color", "rgb(206, 212, 218)");
  });

  // Last name validation
  test("Last name. by empty input", async ({ page }) => {
    const nameInput = page.locator('input[name="lastName"]');
    await nameInput.fill("");
    await nameInput.blur();

    await expect(page.getByText("Last name required")).toBeVisible();
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Last name. by wrong data", async ({ page }) => {
    const nameInput = page.locator('input[name="lastName"]');
    await nameInput.fill("@#");
    await nameInput.blur();
    await expect(page.getByText("Last name is invalid")).toBeVisible();
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Last name. by special characters", async ({ page }) => {
    const specialChars = ["@", "#", "$", "%"];

    const nameInput = page.locator('input[name="lastName"]');

    for (const char of specialChars) {
      await nameInput.fill(`x${char}`);
      await nameInput.blur();
      await expect(page.getByText("Last name is invalid")).toBeVisible();
      await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    }
  });

  test("Last name. by less than 2 symbols", async ({ page }) => {
    const nameInput = page.locator("input[name='lastName']");
    await nameInput.fill("x");
    await nameInput.blur();
    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Last name. by more than 20 symbols", async ({ page }) => {
    const nameInput = page.locator("input[name='lastName']");
    await nameInput.fill("x".repeat(21));
    await nameInput.blur();
    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Last name. ny only the EN alphabet", async ({ page }) => {
    const nameInput = page.locator('input[name="lastName"]');
    await nameInput.fill("Фуртуне");
    await nameInput.blur();
    await expect(page.getByText("Last name is invalid")).toBeVisible();
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Last name. by ignored spaces", async ({ page }) => {
    const nameInput = page.locator('input[name="lastName"]');
    const inputValue = "  Furtune ";
    await nameInput.fill(inputValue.trim());
    await nameInput.blur();
    await expect(nameInput).toHaveValue("Furtune");
  });

  test("Last name. by correct data", async ({ page }) => {
    const nameInput = page.locator('input[name="lastName"]');
    const inputValue = "Furtune";
    await nameInput.fill(inputValue);
    await nameInput.blur();
    await expect(nameInput).toHaveValue(inputValue);
    await expect(nameInput).toHaveCSS("border-color", "rgb(206, 212, 218)");
  });

  // Email validation
  test("Email. by empty field", async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill("");
    await emailInput.blur();

    await expect(page.getByText("Email required")).toBeVisible();
    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Email. by wrong data", async ({ page }) => {
    const emailInput = page.locator("input[name='email']");
    await emailInput.fill("alinatest.com");
    await emailInput.blur();
    await expect(page.getByText("Email is incorrect")).toBeVisible();
    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Email. by correct data", async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    const inputValue = "alina@test.com";
    await emailInput.fill(inputValue);
    await emailInput.blur();
    await expect(emailInput).toHaveValue(inputValue);
    await expect(emailInput).toHaveCSS("border-color", "rgb(206, 212, 218)");
  });

  // Password validation
  test("Password. by empty field", async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.fill("");
    await passwordInput.blur();

    await expect(page.getByText("Password required")).toBeVisible();
    await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Password. by less than 8 symbols", async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.fill("1".repeat(5));
    await passwordInput.blur();
    await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
    ).toBeVisible();
    await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Password. by more than 15 symbols", async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.fill("1".repeat(16));
    await passwordInput.blur();
    await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
    ).toBeVisible();
    await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Password. by correct data", async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    const inputValue = "Test123!";
    await passwordInput.fill(inputValue);
    await passwordInput.blur();
    await expect(passwordInput).toHaveValue(inputValue);
    await expect(passwordInput).toHaveCSS("border-color", "rgb(206, 212, 218)");
  });

  //Re-enter password filed validation
  test("Re-enter password. by empty field", async ({ page }) => {
    const rePasswordInput = page.locator('input[name="repeatPassword"]');
    await rePasswordInput.fill("");
    await rePasswordInput.blur();

    await expect(page.getByText("Re-enter password required")).toBeVisible();
    await expect(rePasswordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Re-enter password. by password do not match", async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    const rePasswordInput = page.locator('input[name="repeatPassword"]');
    await passwordInput.fill("Test123!");
    await rePasswordInput.fill("Test1234!");
    await rePasswordInput.blur();

    await expect(page.getByText("Passwords do not match")).toBeVisible();
    await expect(rePasswordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Re-enter password. by passwords matches", async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    const rePasswordInput = page.locator('input[name="repeatPassword"]');
    const inputValue = "Test123!";
    await passwordInput.fill(inputValue);
    await rePasswordInput.fill(inputValue);
    await rePasswordInput.blur();
    await expect(rePasswordInput).toHaveValue(inputValue);
    await expect(rePasswordInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );
  });

  // Register button validation
  test("Register button. by disabled state", async ({ page }) => {
    const registerButton = page.getByRole("button", { name: "Register" });
    await expect(registerButton).toBeDisabled();
  });
  test("Register button. by success registration", async ({ page }) => {
    const email = `aqa-alina.test+1${Date.now()}@test.com`;

    await page.locator('input[name="name"]').fill("Alina");
    await page.locator('input[name="lastName"]').fill("Furtune");
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill("Test1234!@");
    await page.locator('input[name="repeatPassword"]').fill("Test1234!@");

    const registerButton = page.getByRole("button", { name: "Register" });
    await expect(registerButton).toBeEnabled();
    await registerButton.click();

    await expect(page.locator(".panel-layout")).toBeVisible();
  });
});
