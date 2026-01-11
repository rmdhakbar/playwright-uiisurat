import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ROUTES } from "../config/routes";

const username = process.env.PLAYWRIGHT_USERNAME!;
const password = process.env.PLAYWRIGHT_PASSWORD!;
let loginPage: LoginPage;
let homePage: HomePage;

test.describe("Login Test", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await loginPage.goto();
  });
  test("Should display login page", async ({ page }) => {
    await expect(page).toHaveURL(ROUTES.LOGIN);
  });
  test("Validate Login UI", async ({ page }) => {
    await expect(loginPage.logoUII).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.PasswordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
  test("Login with Valid Credential", async ({ page }) => {
    await loginPage.login(username, password);
    await expect(page).toHaveURL(ROUTES.HOME);
  });
});
