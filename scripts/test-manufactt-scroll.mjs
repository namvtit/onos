import { chromium } from '@playwright/test';

async function testManufacttScroll() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://manufactt-wbs.webflow.io/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const sections = [
    '.navbar',
    '.hero-section',
    '.about-section',
    '.service-section',
    '.product-section',
    '.industry-section',
    '.case-study-section',
    '.why-choose-section',
    '.testimonial-section',
    '.blog-section',
    '.footer'
  ];

  console.log('=== MANUFACTT SCROLL TEST ===');
  for (const s of sections) {
    const el = await page.$(s);
    if (!el) {
      console.log(`Section ${s} NOT FOUND`);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const info = await page.evaluate((selector) => {
      const target = document.querySelector(selector);
      const zeroOp = Array.from(target.querySelectorAll('*')).filter(c => window.getComputedStyle(c).opacity === '0');
      return {
        section: selector,
        zeroOpCount: zeroOp.length,
        zeroDetails: zeroOp.map(c => ({
          tag: c.tagName,
          class: c.className,
          wId: c.getAttribute('data-w-id'),
          text: c.textContent?.trim().slice(0, 30)
        }))
      };
    }, s);

    console.log(`Section ${s}: zero opacity elements remaining = ${info.zeroOpCount}`);
    if (info.zeroOpCount > 0) {
      console.log('  Remaining hidden:', JSON.stringify(info.zeroDetails, null, 2));
    }
  }

  await browser.close();
}

testManufacttScroll();
