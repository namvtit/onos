import { chromium } from '@playwright/test';

async function testAnimation() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Monitor an about element as we scroll towards it
  // About section starts around y = 1600px
  console.log('Scroll pos before:', await page.evaluate(() => window.scrollY));

  // Scroll to 1000px
  await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'smooth' }));
  await page.waitForTimeout(200);

  // Check opacity right after entering
  const opEarly = await page.evaluate(() => {
    const el = document.querySelector('.about-left-wrap');
    return window.getComputedStyle(el).opacity;
  });
  console.log('Opacity during/right after enter:', opEarly);

  await page.waitForTimeout(1200); // Wait for 1s transition to finish
  const opLate = await page.evaluate(() => {
    const el = document.querySelector('.about-left-wrap');
    return window.getComputedStyle(el).opacity;
  });
  console.log('Opacity after animation completion:', opLate);

  await browser.close();
}

testAnimation();
