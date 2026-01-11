import { expect, type Page, type Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly logoUII: Locator;
  readonly notifikasi: Locator;
  readonly languageButton: Locator;
  readonly profileButton: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoUII = page.getByRole("img", { name: "UII-Gateway" });
    this.notifikasi = page.locator("#dropdownNotif");
    this.languageButton = page.getByRole("button", { name: "language-flag" });
    this.profileButton = page.getByRole("button", { name: "user" });
    this.searchInput = page.getByRole("textbox", { name: "Cari aplikasi" });
    this.searchButton = page.locator(".btn-search");
  }

  async validateTopNavBar() {
    await expect(this.logoUII).toBeVisible();
    await expect(this.notifikasi).toBeVisible();
    await expect(this.languageButton).toBeVisible();
    await expect(this.profileButton).toBeVisible();
  }
  async validateSearchBar() {
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }
}
