import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
  if (process.env.CI && process.env.XSOURCECOOKIE) {
    const cookie = process.env.XSOURCECOOKIE
    await context.addCookies([{ name: 'X-source', value: cookie }]);
    page.goto('/')
  }
});

test('has title', async ({ page }) => {


  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React + TS");
});

