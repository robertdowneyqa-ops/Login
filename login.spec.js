const { test, expect } = require('@playwright/test');

/**
 * Run example:
 * BASE_URL="https://pozitivehub.com" \
 * LOGIN_EMAIL="you@example.com" \
 * LOGIN_PASSWORD="your-password" \
 * npx playwright test login.spec.js
 */
test('login on PozitiveHub page', async ({ page }) => {
  const baseUrl = process.env.BASE_URL || 'https://pozitivehub.com';
  const email = process.env.LOGIN_EMAIL;
  const password = process.env.LOGIN_PASSWORD;

  test.skip(!email || !password, 'Set LOGIN_EMAIL and LOGIN_PASSWORD before running this test.');

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

  // Selectors based on the login form shown in screenshot.
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: /^login$/i }).click();

  // Basic post-login assertion. Change this if your app redirects differently.
  await expect(page).not.toHaveURL(/login/i);
});
