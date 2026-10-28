import { chromium } from '@playwright/test';

async function checkHeights() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const pM = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pL = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await pM.goto('https://manufactt-wbs.webflow.io/', { waitUntil: 'domcontentloaded' });
  await pM.waitForTimeout(2000);
  await pL.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await pL.waitForTimeout(1000);

  // Compare service items
  const sM = await pM.evaluate(() => {
    return Array.from(document.querySelectorAll('.service-list-item')).map(el => {
      const r = el.getBoundingClientRect();
      const img = el.querySelector('.service-image')?.getBoundingClientRect();
      const content = el.querySelector('.service-content-wrap')?.getBoundingClientRect();
      return { totalH: r.height, imgH: img?.height, contentH: content?.height };
    });
  });

  const sL = await pL.evaluate(() => {
    return Array.from(document.querySelectorAll('.service-list-item')).map(el => {
      const r = el.getBoundingClientRect();
      const img = el.querySelector('.service-image')?.getBoundingClientRect();
      const content = el.querySelector('.service-content-wrap')?.getBoundingClientRect();
      return { totalH: r.height, imgH: img?.height, contentH: content?.height };
    });
  });

  console.log('--- SERVICES COMPARISON ---');
  console.log('Manufactt service items:', sM);
  console.log('Local service items:', sL);

  // Compare product cards
  const prodM = await pM.evaluate(() => {
    return Array.from(document.querySelectorAll('.product-info-main')).slice(0, 4).map(el => {
      const r = el.getBoundingClientRect();
      const img = el.querySelector('.product-image')?.getBoundingClientRect();
      const desc = el.querySelector('.product-description')?.getBoundingClientRect();
      const list = el.querySelector('.product-list')?.getBoundingClientRect();
      return { totalH: r.height, imgH: img?.height, descH: desc?.height, listH: list?.height };
    });
  });

  const prodL = await pL.evaluate(() => {
    return Array.from(document.querySelectorAll('.product-info-main')).slice(0, 4).map(el => {
      const r = el.getBoundingClientRect();
      const img = el.querySelector('.product-image')?.getBoundingClientRect();
      const desc = el.querySelector('.product-description')?.getBoundingClientRect();
      const list = el.querySelector('.product-list')?.getBoundingClientRect();
      return { totalH: r.height, imgH: img?.height, descH: desc?.height, listH: list?.height };
    });
  });

  console.log('--- PRODUCTS COMPARISON ---');
  console.log('Manufactt product cards:', prodM);
  console.log('Local product cards:', prodL);

  await browser.close();
}

checkHeights();
