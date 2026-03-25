const { test, expect } = require('@playwright/test');

/**
 * Run example:
 * BASE_URL="https://pozitivehub.com" \
 * LOGIN_EMAIL="you@example.com" \
 * LOGIN_PASSWORD="your-password" \
 * npx playwright test login.spec.js --headed
 */
test('login on PozitiveHub page', async ({ page }) => {
  const baseUrl = process.env.BASE_URL || 'https://pozitivehub.com';
  const email = process.env.LOGIN_EMAIL;
  const password = process.env.LOGIN_PASSWORD;

  test.skip(!email || !password, 'Set LOGIN_EMAIL and LOGIN_PASSWORD before running this test.');

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

  // IMPORTANT: this page has two password-like inputs (Password + OTP).
  // We intentionally target only the real password field and avoid generic input[type="password"].
  const emailInput = page.locator('#Email, input[name="Email"], input[type="email"]').first();
  const passwordInput = page.locator('#Password, input[name="Password"], input[placeholder="Password"]').first();
  const loginButton = page.getByRole('button', { name: /^login$/i });

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await emailInput.fill(email);
  await passwordInput.fill(password);
  await loginButton.click();

  // Basic post-login assertion. Change this if your app redirects differently.
  await expect(page).not.toHaveURL(/login/i, { timeout: 15000 });
});
