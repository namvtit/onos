import { chromium } from '@playwright/test';

async function check() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  for (const vp of [{ w: 1440, h: 900 }, { w: 375, h: 812 }]) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const bodyScrollW = await page.evaluate(() => document.body.scrollWidth);
    const docScrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    const winW = await page.evaluate(() => window.innerWidth);
    console.log(`VP ${vp.w}px: Window=${winW}, DocScrollW=${docScrollW}, BodyScrollW=${bodyScrollW}`);
    await page.close();
  }
  await browser.close();
}

check();
