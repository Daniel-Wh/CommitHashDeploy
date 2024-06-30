import { test, expect } from '@playwright/test';

test('has title', async ({ page, context }) => {
  if (process.env.CI && process.env.XSOURCECOOKIE) {
    const cookie = process.env.XSOURCECOOKIE
    await context.addCookies([{ name: 'X-source', value: cookie, url: process.env.BASE_URL ?? 'http://localhost:5173' }]);
  }
  await page.goto('/')
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React + TS");

  await page.goto('/')
  const link = await page.getByRole('link', { name: /LinkedIn Post about this/i });
  await expect(link).toBeDefined();
  await expect(link).toHaveAttribute('href', 'https://www.linkedin.com/posts/daniel-wh_github-daniel-whcommithashdeploy-activity-7213178505499475968-JjVs?utm_source=share&utm_medium=member_desktop')
});
