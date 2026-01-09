import { test, expect } from "@playwright/test";
import { id_ID, fakerID_ID, faker } from "@faker-js/faker";

const username = process.env.PLAYWRIGHT_USERNAME;
const password = process.env.PLAYWRIGHT_PASSWORD;

const namaLengkap = fakerID_ID.person.fullName();
const perusahaan = fakerID_ID.company.name();
const jabatan = fakerID_ID.person.jobTitle();
const alamat = fakerID_ID.location.streetAddress();
const email = fakerID_ID.internet.email();
const nomor_hp =
  "8" + fakerID_ID.string.numeric({ length: { max: 11, min: 9 } });

test.beforeEach("Login with Valid Credential", async ({ page }, testInfo) => {
  if (testInfo.project.metadata.noHook || testInfo.title.includes("@no-hook")) {
    return;
  }
  await page.goto("/");

  // fill username and password
  await page
    .getByRole("textbox", { name: "Nama pengguna" })
    .fill(username || "");
  await page.getByRole("textbox", { name: "Kata sandi" }).fill(password || "");

  // press login button
  await page.getByRole("button", { name: "Masuk" }).click();

  // validate url
  await expect(page).toHaveURL("/");
});

test("Validate UI Login Page @no-hook", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/login/);

  // logo uii
  await expect(page.getByRole("img", { name: "UII Gateway" })).toBeVisible();

  // form login
  await expect(
    page.getByRole("textbox", { name: "Nama pengguna" })
  ).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Kata sandi" })).toBeVisible();

  // button
  await expect(page.getByRole("button", { name: "Masuk" })).toBeVisible();
});

test("Login with Invalid Credential @no-hook", async ({ page }) => {
  await page.goto("/");

  // fill username and password
  await page
    .getByRole("textbox", { name: "Nama pengguna" })
    .fill(username || "");
  await page.getByRole("textbox", { name: "Kata sandi" }).fill("Invalidpw");

  // press login button
  await page.getByRole("button", { name: "Masuk" }).click();

  // validate error message
  await expect(page.getByText("salah")).toBeVisible();
});

test("Validate Home Page When Sucessfully Logged In", async ({ page }) => {
  // validate top nav
  await expect(page.getByRole("img", { name: "UII-Gateway" })).toBeVisible();
  await expect(page.locator("#dropdownNotif")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "language-flag" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "user" })).toBeVisible();

  // search bar
  await expect(
    page.getByRole("textbox", { name: "Cari aplikasi" })
  ).toBeVisible();
  await expect(page.locator(".btn-search")).toBeVisible();
});

test("Testing Logout Feature", async ({ page }) => {
  // logout through profile
  await page.getByRole("button", { name: "user" }).click();
  await page.getByRole("link", { name: "Keluar" }).click();

  // validate after logout user back to login screen
  await expect(page).toHaveURL(/login/);
});

test("UIISurat-Validate UI", async ({ page }) => {
  // navigate to uiisurat
  await page.locator(".home-app-item").filter({ hasText: "UIISurat" }).click();
  await expect(page).toHaveURL(/letter/);

  const homeIcon = page
    .locator(".breadcrumb li")
    .first()
    .locator('a[href="/"]');

  await expect(homeIcon).toBeVisible();
  await expect(
    page.locator(".breadcrumb").filter({ hasText: "Surat" })
  ).toBeVisible();
});
