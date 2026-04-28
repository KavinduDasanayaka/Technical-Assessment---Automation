import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import customerData from '../test-data/Customer.js';

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const VALID_USERNAME = process.env.VALID_USERNAME;
const VALID_PASSWORD = process.env.VALID_PASSWORD;

test.describe('Checkout Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto(BASE_URL);

    // Login with valid credentials
    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');

    // Wait for inventory page to load
    await page.waitForURL(`${BASE_URL}/inventory.html`);

    // Add items to cart
    // Note: Adjust the item selectors based on actual item names in the inventory
    //U can modify the item selectors to match the actual items u need to add to the cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');

    // Click cart icon
    await page.click('[data-test="shopping-cart-link"]');

    // Click checkout button
    await page.click('[data-test="checkout"]');
  });

  test('TC_13 - Validate Checkout Overview information UI', async ({ page }) => {
    // Fill Your Information form with test data
    const customer = customerData.validCustomer;
    await page.fill('[data-test="firstName"]', customer.firstName);
    await page.fill('[data-test="lastName"]', customer.lastName);
    await page.fill('[data-test="postalCode"]', customer.postalCode);


    // Click Continue button
    await page.click('[data-test="continue"]');

    // Wait for checkout overview page to load
    await page.waitForURL(`${BASE_URL}/checkout-step-two.html`);

    // Verify all added items are displayed
    await expect(page.locator('[data-test="inventory-item-name"]').first()).toBeVisible();
    const itemCount = await page.locator('[data-test="inventory-item-name"]').count();
    expect(itemCount).toBeGreaterThan(0);

    // Verify Payment Information is displayed
    await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
    await expect(page.locator('[data-test="payment-info-value"]')).toBeVisible();

    // Verify Shipping Information is displayed
    await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
    await expect(page.locator('[data-test="shipping-info-value"]')).toBeVisible();

    // Verify Price Total is displayed
    await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();
    await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
    await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
    await expect(page.locator('[data-test="total-label"]')).toBeVisible();
  });

  test('TC_12 - Check Your Information form validation with empty values', async ({ page }) => {
    // Keep all fields empty and click Continue button
    await page.click('[data-test="continue"]');

    // Verify error message is displayed
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Error: First Name is required'
    );

    // Verify user stays on checkout form
    await expect(page).toHaveURL(`${BASE_URL}/checkout-step-one.html`);
  });

  test('TC_14 - Validate final total calculation', async ({ page }) => {
    // Fill Your Information form with test data
    const customer = customerData.validCustomer;
    await page.fill('[data-test="firstName"]', customer.firstName);
    await page.fill('[data-test="lastName"]', customer.lastName);
    await page.fill('[data-test="postalCode"]', customer.postalCode);

    // Click Continue button
    await page.click('[data-test="continue"]');

    // Wait for checkout overview page to load
    await page.waitForURL(`${BASE_URL}/checkout-step-two.html`);

    // Get subtotal value
    const subtotalText = await page.locator('[data-test="subtotal-label"]').textContent();
    const subtotalMatch = subtotalText.match(/\$[\d.]+/);
    const subtotal = parseFloat(subtotalMatch[0].substring(1));

    // Get tax value
    const taxText = await page.locator('[data-test="tax-label"]').textContent();
    //Isolate the numeric part of the tax text using regex and convert it to a float
    const taxMatch = taxText.match(/\$[\d.]+/);
    const tax = parseFloat(taxMatch[0].substring(1));

    // Get total value
    const totalText = await page.locator('[data-test="total-label"]').textContent();
    //Isolate the numeric part of the tax text using regex and convert it to a float
    const totalMatch = totalText.match(/\$[\d.]+/);
    const total = parseFloat(totalMatch[0].substring(1));

    // Verify total calculation: Subtotal + Tax = Total
    const expectedTotal = Math.round((subtotal + tax) * 100) / 100;
    expect(total).toBe(expectedTotal);

    // Verify total is displayed correctly
    await expect(page.locator('[data-test="total-label"]')).toBeVisible();
    await expect(page.locator('[data-test="total-label"]')).toContainText('Total:');
  });
});
