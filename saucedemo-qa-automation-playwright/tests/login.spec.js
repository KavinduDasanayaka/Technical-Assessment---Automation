import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const VALID_USERNAME = process.env.VALID_USERNAME;
const VALID_PASSWORD = process.env.VALID_PASSWORD;
const INVALID_USERNAME = process.env.INVALID_USERNAME;
const INVALID_PASSWORD = process.env.INVALID_PASSWORD;

test.describe('Login Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto(BASE_URL);
  });

  test('TC_01 - Check login with correct username and password', async ({ page }) => {

    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', VALID_PASSWORD);

    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    await expect(page.locator('[data-test="secondary-header"]')).toContainText('Products');
  });

  test('TC_02 - Check login with incorrect username and password', async ({ page }) => {

    await page.fill('[data-test="username"]', INVALID_USERNAME);

    await page.fill('[data-test="password"]', INVALID_PASSWORD);

    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).toHaveURL(`${BASE_URL}`);
  });

  test('TC_03 - Check login with empty username and password', async ({ page }) => {

    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Username is required'
    );
    await expect(page).toHaveURL(`${BASE_URL}`);
  });
});
