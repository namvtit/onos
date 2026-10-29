import { chromium } from '@playwright/test';

async function testAllViewports() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const viewports = [
    { width: 1440, height: 900 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 375, height: 812 },
  ];

  for (const vp of viewports) {
    await page.setViewportSize(vp);
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`Viewport ${vp.width}x${vp.height}: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}, diff=${scrollWidth - clientWidth}`);
  }

  await browser.close();
}

testAllViewports().catch(console.error);
