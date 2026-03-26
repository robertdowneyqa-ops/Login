diff --git a/login.spec.js b/login.spec.js
index 79c83d475fe8554e65ad7953c7550db48b30d7ef..6297b061311b3e84e68d1e1ad0586bed0f5797f4 100644
--- a/login.spec.js
+++ b/login.spec.js
@@ -1,17 +1,64 @@
-import { test, expect } from '@playwright/test';
+const { test, expect } = require('@playwright/test');
 
-test('user can log in from the PozitiveHub login page', async ({ page }) => {
-  const baseUrl = process.env.BASE_URL ?? 'https://pozitivehub.com';
-  const email = process.env.LOGIN_EMAIL;
-  const password = process.env.LOGIN_PASSWORD;
+/**
+ * QUICK START (no env vars needed if you set hardcoded values below):
+ *   npm run test:login:headed
+ *
+ * Safer option (recommended):
+ *   Set LOGIN_EMAIL / LOGIN_PASSWORD via environment variables.
+ */
 
-  test.skip(!email || !password, 'Set LOGIN_EMAIL and LOGIN_PASSWORD environment variables.');
+// === Hardcoded fallback credentials (EDIT THESE if you want no-env execution) ===
+// WARNING: do not commit real credentials to a public/shared repository.
+const HARDCODED_EMAIL = 'ankit.shrivastav@pe.solutions';
+const HARDCODED_PASSWORD = 'kat41$KAT';
 
-  await page.goto(baseUrl);
+async function humanType(locator, text, delay = 120) {
+  await locator.click();
+  await locator.clear();
+  await locator.pressSequentially(text, { delay });
+}
 
-  await page.fill('input[type="email"]', email!);
-  await page.fill('input[type="password"]', password!);
-  await page.click('button:has-text("Login")');
+test('login on PozitiveHub page', async ({ page }) => {
+  const baseUrl = process.env.BASE_URL || 'https://pozitivehub.com';
+  const email = process.env.LOGIN_EMAIL || HARDCODED_EMAIL;
+  const password = process.env.LOGIN_PASSWORD || HARDCODED_PASSWORD;
+  const showSteps = process.env.SHOW_STEPS === 'true';
 
-  await expect(page).not.toHaveURL(/login/i);
+  test.skip(
+    !email || !password,
+    'Set real credentials in HARDCODED_EMAIL/HARDCODED_PASSWORD or env vars.'
+  );
+
+  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
+
+  // IMPORTANT: this page has two password-like inputs (Password + OTP).
+  // We intentionally target only the real password field and avoid generic input[type="password"].
+  const emailInput = page.locator('#Email, input[name="Email"], input[type="email"]').first();
+  const passwordInput = page.locator('#Password, input[name="Password"], input[placeholder="Password"]').first();
+  const loginButton = page.getByRole('button', { name: /^login$/i });
+
+  await expect(emailInput).toBeVisible();
+  await expect(passwordInput).toBeVisible();
+
+  if (showSteps) {
+    await humanType(emailInput, email, 120);
+    await page.waitForTimeout(800);
+
+    await humanType(passwordInput, password, 140);
+    await page.waitForTimeout(1000);
+  } else {
+    await emailInput.fill(email);
+    await passwordInput.fill(password);
+  }
+
+  await loginButton.click();
+
+  if (showSteps) {
+    await page.waitForTimeout(3000);
+  }
+
+  // Allow UI redirect/load to settle, then verify we left login page.
+  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
+  await expect(page).not.toHaveURL(/login/i, { timeout: 15000 });
 });
