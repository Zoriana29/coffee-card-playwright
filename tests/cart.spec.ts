import { test, expect } from '@playwright/test';

test.describe('Coffee Cart (coffee-cart.app) - cart', () => {
  test('should show one item in the cart after adding Espresso', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="Espresso"]').click();
    await expect(page.locator('#app')).toContainText('cart (1)');
  });

  test('should display Espresso in the cart', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="Espresso"]').click();
    await page.getByRole('link', { name: 'Cart page' }).click();
    await expect(page.locator('#app')).toContainText('Espresso');
  });

  test('should display correct total after adding Espresso and Cappuccino', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $29.00');
  });

  test('should show empty cart message when no items are added', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('#app')).toContainText('No coffee, go add some.');
  });
});
