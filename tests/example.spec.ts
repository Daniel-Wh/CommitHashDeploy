import { test, expect } from '@playwright/test';

test('has title', async ({ page, context }) => {
  console.log('CI:', process.env.CI);
  console.log('XSOURCECOOKIE:', process.env.XSOURCECOOKIE);
  if (process.env.CI && process.env.XSOURCECOOKIE) {
    const cookie = process.env.XSOURCECOOKIE
    await context.addCookies([{ name: 'X-source', value: cookie, domain: 'devopswithme.net' }]);
  }
  await page.goto('/')
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React + TS");
});

