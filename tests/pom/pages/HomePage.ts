import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export class HomePage extends BasePage {
  //Locators
  private signUpButton: Locator;

  constructor(page: Page) {
    super(page);
    //Locators
    this.signUpButton = this.page.getByRole("button", { name: "Sign up" });
  }

  async navigate() {
    await this.page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }
}
