import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class RegistrationPage extends BasePage {
  //Locators
  private nameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private repeatPasswordInput: Locator;
  private registerButton: Locator;
  private modalBody: Locator;
  private panelLayout: Locator;

  constructor(page: Page) {
    super(page);
    //Locators
    this.nameInput = this.page.locator('input[name="name"]');
    this.lastNameInput = this.page.locator('input[name="lastName"]');
    this.emailInput = this.page.locator('input[name="email"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.repeatPasswordInput = this.page.locator(
      'input[name="repeatPassword"]'
    );
    this.registerButton = this.page.getByRole("button", { name: "Register" });
    this.modalBody = this.page.locator(".modal-body");
    this.panelLayout = this.page.locator(".panel-layout");
  }

  async ensureModalVisible() {
    await expect(this.modalBody).toBeVisible();
  }

  async fillName(value: string) {
    await this.nameInput.fill(value);
    await this.nameInput.blur();
  }

  async fillLastName(value: string) {
    await this.lastNameInput.fill(value);
    await this.lastNameInput.blur();
  }

  async fillEmail(value: string) {
    await this.emailInput.fill(value);
    await this.emailInput.blur();
  }

  async fillPassword(value: string) {
    await this.passwordInput.fill(value);
    await this.passwordInput.blur();
  }

  async fillRepeatPassword(value: string) {
    await this.repeatPasswordInput.fill(value);
    await this.repeatPasswordInput.blur();
  }

  async fillRegistrationForm({
    name,
    lastName,
    email,
    password,
    repeatPassword,
  }: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
  }) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async expectNameError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
    await expect(this.nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  async expectLastNameError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
    await expect(this.lastNameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  }

  async expectEmailError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
    await expect(this.emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  async expectPasswordError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
    await expect(this.passwordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  }

  async expectRepeatPasswordError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
    await expect(this.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  }

  async expectNameValid(value: string) {
    await expect(this.nameInput).toHaveValue(value);
    await expect(this.nameInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );
  }

  async expectLastNameValid(value: string) {
    await expect(this.lastNameInput).toHaveValue(value);
    await expect(this.lastNameInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );
  }

  async expectEmailValid(value: string) {
    await expect(this.emailInput).toHaveValue(value);
    await expect(this.emailInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );
  }

  async expectPasswordValid(value: string) {
    await expect(this.passwordInput).toHaveValue(value);
    await expect(this.passwordInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );
  }

  async expectRepeatPasswordValid(value: string) {
    await expect(this.repeatPasswordInput).toHaveValue(value);
    await expect(this.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(206, 212, 218)"
    );
  }

  async expectRegisterButtonDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }

  async expectRegisterButtonEnabled() {
    await expect(this.registerButton).toBeEnabled();
  }

  async expectPanelLayoutVisible() {
    await expect(this.panelLayout).toBeVisible();
  }
}
