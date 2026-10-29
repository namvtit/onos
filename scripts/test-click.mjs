import { chromium } from '@playwright/test';

async function testClick() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  const capabilityRows = page.locator('.service-info-link');
  console.log('Count:', await capabilityRows.count());

  const row = capabilityRows.nth(1);
  await row.scrollIntoViewIfNeeded();

  const topEl = await page.evaluate(() => {
    const r = document.querySelectorAll('.service-info-link')[1].getBoundingClientRect();
    const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return {
      rect: r,
      tag: el?.tagName,
      className: el?.className,
      outerHTML: el?.outerHTML?.slice(0, 100)
    };
  });
  console.log('After scrollIntoView:', topEl);

  try {
    await row.click({ timeout: 5000 });
    console.log('Click succeeded!');
  } catch (err) {
    console.log('Click failed:', err.message);
  }

  await browser.close();
}

testClick().catch(console.error);
