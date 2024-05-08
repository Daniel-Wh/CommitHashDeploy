import { test, expect } from '@playwright/test';

test('has title', async ({ page, context }) => {
  if (process.env.CI && process.env.XSOURCECOOKIE) {
    const cookie = process.env.XSOURCECOOKIE
    await context.addCookies([{ name: 'X-source', value: cookie }]);
  }
  await page.goto('/')
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React + TS");
});

