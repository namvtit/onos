import { chromium } from '@playwright/test';

async function checkAbout() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const about = await page.$('#about');
  await about.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const boxes = Array.from(document.querySelectorAll('.about-info-box')).map(b => ({
      class: b.className,
      rect: b.getBoundingClientRect(),
      text: b.textContent?.replace(/\s+/g, ' ').trim()
    }));
    const imgBox = document.querySelector('.about-image-box')?.getBoundingClientRect();
    const title = document.querySelector('.about-section .section-title')?.textContent?.trim();
    return { title, imgBox, boxes };
  });

  console.log('LOCAL ABOUT SECTION:');
  console.log(JSON.stringify(data, null, 2));

  await browser.close();
}

checkAbout();
