const { test, expect } = require('@playwright/test');

/**
 * QUICK START (no env vars needed if you set hardcoded values below):
 *   npm run test:login:headed
 *
 * Safer option (recommended):
 *   Set LOGIN_EMAIL / LOGIN_PASSWORD via environment variables.
 */

// === Hardcoded fallback credentials (EDIT THESE if you want no-env execution) ===
// WARNING: do not commit real credentials to a public/shared repository.
const HARDCODED_EMAIL = 'ankit.shrivastav@pe.solutions';
const HARDCODED_PASSWORD = 'kat41$KAT';

test('login on PozitiveHub page', async ({ page }) => {
  const baseUrl = process.env.BASE_URL || 'https://pozitivehub.com';
  const email = process.env.LOGIN_EMAIL || HARDCODED_EMAIL;
  const password = process.env.LOGIN_PASSWORD || HARDCODED_PASSWORD;
  const showSteps = process.env.SHOW_STEPS === 'true';

  test.skip(
    !email || !password,
    'Set real credentials in HARDCODED_EMAIL/HARDCODED_PASSWORD or env vars.'
  );

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

  // IMPORTANT: this page has two password-like inputs (Password + OTP).
  // We intentionally target only the real password field and avoid generic input[type="password"].
  const emailInput = page.locator('#Email, input[name="Email"], input[type="email"]').first();
  const passwordInput = page.locator('#Password, input[name="Password"], input[placeholder="Password"]').first();
  const loginButton = page.getByRole('button', { name: /^login$/i });

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await emailInput.fill(email);
  if (showSteps) await page.waitForTimeout(1500);

  await passwordInput.fill(password);
  if (showSteps) await page.waitForTimeout(1500);

  await loginButton.click();
  if (showSteps) await page.waitForTimeout(2000);

  // Basic post-login assertion. Change this if your app redirects differently.
  await expect(page).not.toHaveURL(/login/i, { timeout: 15000 });
});
