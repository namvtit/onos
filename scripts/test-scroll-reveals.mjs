import { chromium } from '@playwright/test';

async function testScroll() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const sections = [
    '#home',
    '.hero-video-wrap',
    '#about',
    '#capabilities',
    '#products',
    '#production-fit',
    '#network',
    '#workflow',
    '#gallery',
    '#faq',
    '#contact',
    '#Footer'
  ];

  console.log('=== SCROLLING SECTION BY SECTION ===');
  for (const sel of sections) {
    const el = await page.$(sel);
    if (!el) {
      console.log(`Section ${sel} NOT FOUND!`);
      continue;
    }

    // Scroll into view
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Wait 1 second for animations

    const status = await page.evaluate((selector) => {
      const target = document.querySelector(selector);
      if (!target) return null;

      // Find all elements with data-w-id in this section
      const wElements = Array.from(target.querySelectorAll('[data-w-id]')).map(c => ({
        wId: c.getAttribute('data-w-id'),
        tag: c.tagName,
        class: c.className.slice(0, 30),
        opacity: window.getComputedStyle(c).opacity,
        transform: window.getComputedStyle(c).transform,
        display: window.getComputedStyle(c).display,
        visibility: window.getComputedStyle(c).visibility
      }));

      const zeroOpacity = wElements.filter(x => x.opacity === '0');

      return {
        totalWithWId: wElements.length,
        zeroOpacityCount: zeroOpacity.length,
        zeroList: zeroOpacity
      };
    }, sel);

    console.log(`\nSection ${sel}: Total [data-w-id]=${status?.totalWithWId} | Still opacity 0=${status?.zeroOpacityCount}`);
    if (status?.zeroOpacityCount && status.zeroOpacityCount > 0) {
      console.log('STILL INVISIBLE ELEMENTS in', sel, ':', JSON.stringify(status.zeroList, null, 2));
    } else {
      console.log('ALL ELEMENTS VISIBLE in', sel, '!');
    }
  }

  await browser.close();
}

testScroll();
