import { chromium } from '@playwright/test';

async function checkServiceClick() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const row = document.querySelectorAll('.service-info-link')[1];
    const rect = row.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const topEl = document.elementFromPoint(x, y);
    return {
      rect,
      x,
      y,
      topEl: {
        tag: topEl?.tagName,
        id: topEl?.id,
        className: topEl?.className,
        outerHTML: topEl?.outerHTML?.slice(0, 150)
      }
    };
  });

  console.log('Top element covering service row 1:', JSON.stringify(info, null, 2));
  await browser.close();
}

checkServiceClick().catch(console.error);
