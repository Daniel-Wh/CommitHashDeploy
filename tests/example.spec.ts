import { test, expect } from '@playwright/test';

test('has title', async ({ page, context }) => {
  if (process.env.CI && process.env.XSOURCECOOKIE) {
    const cookie = process.env.XSOURCECOOKIE
    await context.addCookies([{ name: 'X-source', value: cookie, url: process.env.BASE_URL ?? 'http://localhost:5173' }]);
  }
  await page.goto('/')
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React + TS");
  await expect(page.getByText('Testing this out with SHTEVE')).toBeDefined()
});

