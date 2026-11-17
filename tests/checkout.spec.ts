import { test, expect } from '@playwright/test';

test.describe('Coffee Cart (coffee-cart.app) - checkout', () => {
  test('should preserve entered name and email in the payment form', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Zoriana');
    await page.getByRole('textbox', { name: 'Email' }).fill('zoriana@gmail.com');
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Zoriana');
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('zoriana@gmail.com');
  });

  test('should display a success message after completing a purchase', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Zoriana');
    await page.getByRole('textbox', { name: 'Email' }).fill('zoriana@gmail.com');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
  });

  test('should not submit the payment form when fields are empty', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Thanks for your purchase')).not.toBeVisible();
  });

  test('should not submit the payment form with an invalid email', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill('not-an-email');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Thanks for your purchase')).not.toBeVisible();
  });
});
