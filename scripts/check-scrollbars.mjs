import { chromium } from '@playwright/test';

async function test() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  for (const width of [1440, 1024, 768, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

    const res = await page.evaluate(() => {
      return {
        docScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        hasHorizontalScrollbar: document.documentElement.scrollWidth > window.innerWidth,
        canScrollX: (() => {
          window.scrollTo(500, 0);
          return window.scrollX > 0;
        })()
      };
    });
    console.log(`Width ${width}:`, res);
    await page.close();
  }
  await browser.close();
}

test();
