import { test, expect } from '@playwright/test';

test('has title', async ({ page, context }) => {
  if (process.env.CI && process.env.XSOURCECOOKIE) {
    const cookie = process.env.XSOURCECOOKIE
    await context.addCookies([{ name: 'X-source', value: cookie, url: process.env.BASE_URL ?? 'http://localhost:5173' }]);
  }
  await page.goto('/')
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React + TS");

  // Expect an element matching text.
});

test('has a card with a link to a LinkedIn post', async ({ page }) => {
  await page.goto('/')
  const link = await page.getAttribute('text=LinkedIn Post about this', 'href');
  await expect(link).toBeDefined();
  await expect(link).toHaveProperty('href', 'https://www.linkedin.com/posts/daniel-wh_github-daniel-whcommithashdeploy-activity-7213178505499475968-JjVs/?utm_source=share&utm_medium=member_desktop');
});

