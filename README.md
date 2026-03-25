 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
new file mode 100644
index 0000000000000000000000000000000000000000..5a7f8be8e02fceba14d998b33b2b8fe80ab9876f
--- /dev/null
+++ b/README.md
@@ -0,0 +1,48 @@
+# Playwright Login Test (PozitiveHub)
+
+## 1) Install dependencies
+
+```bash
+npm install
+npx playwright install
+```
+
+## 2) Add your test credentials
+
+Create a `.env` file from `.env.example` and set values:
+
+```bash
+cp .env.example .env
+```
+
+Then update:
+
+- `BASE_URL`
+- `LOGIN_EMAIL`
+- `LOGIN_PASSWORD`
+
+## 3) Run the login test
+
+```bash
+BASE_URL="https://pozitivehub.com" LOGIN_EMAIL="your-email@example.com" LOGIN_PASSWORD="your-password" npx playwright test login.spec.js
+```
+
+Or:
+
+```bash
+npm run test:login
+```
+
+> Note: `npm run test:login` expects the environment variables to already be exported in your shell.
+
+## 4) Files to add in GitHub
+
+- `package.json` - Node + Playwright dependency and test command.
+- `playwright.config.js` - Playwright runner config.
+- `login.spec.js` - actual login automation test script.
+- `.env.example` - sample environment variables (safe to commit, no real secrets).
+- `README.md` - setup and run steps.
+
+## 5) Security note
+
+Never commit real credentials in `.env` or test files.
 
EOF
)
