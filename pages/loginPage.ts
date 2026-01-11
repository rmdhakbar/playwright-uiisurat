import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly PasswordInput: Locator;
  readonly loginButton: Locator;
  readonly logoUII: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "Nama pengguna" });
    this.PasswordInput = page.getByRole("textbox", { name: "Kata sandi" });
    this.loginButton = page.getByRole("button", { name: "Masuk" });
    this.logoUII = page.getByRole("img", { name: "UII Gateway" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.PasswordInput.fill(password);
    await this.loginButton.click();
  }

  async validateLoginUI() {
    await expect(this.logoUII).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.PasswordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
