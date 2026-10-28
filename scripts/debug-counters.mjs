import { chromium } from '@playwright/test';

async function testCounters() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const getCounts = async () => page.evaluate(() => {
    return Array.from(document.querySelectorAll('.count')).map(el => ({
      text: el.textContent?.trim(),
      target: el.dataset.target,
      count: el.dataset.count,
      parentText: el.closest('.inner-number')?.parentElement?.textContent?.replace(/\s+/g, ' ').trim()
    }));
  });

  console.log('=== BEFORE SCROLL ===');
  console.log(await getCounts());

  // Scroll section by section
  for (const s of ['#home', '#about', '#capabilities', '#products', '#production-fit', '#network', '#workflow', '#gallery']) {
    const el = await page.$(s);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
    }
  }
  await page.waitForTimeout(2000);

  console.log('=== AFTER SCROLL ===');
  console.log(await getCounts());

  await browser.close();
}

testCounters();
