import { Page, Locator } from "@playwright/test";

export class HomePage {
  private page: Page;
  private signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.getByRole("button", { name: "Sign up" });
  }

  async navigate() {
    await this.page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }
}
