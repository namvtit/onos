import { chromium } from '@playwright/test';

async function checkManufactt() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://manufactt-wbs.webflow.io/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const sections = ['.navbar', '.hero-section', '.about-section', '.service-section', '.product-section', '.industry-section', '.case-study-section', '.why-choose-section', '.testimonial-section', '.blog-section', '.footer'];
    return sections.map(s => {
      const el = document.querySelector(s);
      if (!el) return { section: s, found: false };
      const zeroOp = Array.from(el.querySelectorAll('*')).filter(c => window.getComputedStyle(c).opacity === '0');
      return {
        section: s,
        found: true,
        height: el.getBoundingClientRect().height,
        zeroOpacityChildren: zeroOp.length
      };
    });
  });

  console.log('--- MANUFACTT AT SCROLL 0 ---');
  console.log(JSON.stringify(data, null, 2));

  await browser.close();
}

checkManufactt();
