import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export class HomePage extends BasePage {
  //Locators
  private signUpButton: Locator;
  private readonly signInButton: Locator = this.page.locator(
    '//button[contains(@class,"header_signin")]'
  );

  constructor(page: Page) {
    super(page);
    //Locators
    this.signUpButton = this.page.getByRole("button", { name: "Sign up" });
  }

  async open() {
    await this.page.goto(" ");
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async clickSignInButton(): Promise<void> {
    await this.signInButton.click();
  }
}
