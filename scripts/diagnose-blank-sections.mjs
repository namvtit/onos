import { chromium } from '@playwright/test';

async function diagnose() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Check section by section at scroll position 0
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

  console.log('=== SECTION DIAGNOSIS (Scroll 0) ===');
  for (const sel of sections) {
    const info = await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      if (!el) return { selector, found: false };
      const cs = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();

      // Find children with opacity 0 or display none or visibility hidden
      const hiddenChildren = Array.from(el.querySelectorAll('*')).filter(c => {
        const ccs = window.getComputedStyle(c);
        return ccs.opacity === '0' || ccs.visibility === 'hidden' || ccs.display === 'none';
      }).map(c => ({
        tag: c.tagName,
        class: c.className,
        wId: c.getAttribute('data-w-id'),
        opacity: window.getComputedStyle(c).opacity,
        display: window.getComputedStyle(c).display,
        visibility: window.getComputedStyle(c).visibility,
        text: c.textContent?.trim().slice(0, 40)
      }));

      // Find all text in section
      const allText = el.textContent?.replace(/\s+/g, ' ').trim().slice(0, 100);

      return {
        selector,
        found: true,
        height: r.height,
        opacity: cs.opacity,
        display: cs.display,
        visibility: cs.visibility,
        textSnippet: allText,
        totalChildren: el.querySelectorAll('*').length,
        hiddenChildrenCount: hiddenChildren.length,
        sampleHidden: hiddenChildren.slice(0, 10)
      };
    }, sel);

    console.log(`\n--- ${sel} ---`);
    console.log(`Height: ${info.height}px | Opacity: ${info.opacity} | Display: ${info.display}`);
    console.log(`Text: ${info.textSnippet}`);
    console.log(`Total children: ${info.totalChildren} | Hidden children: ${info.hiddenChildrenCount}`);
    if (info.sampleHidden?.length > 0) {
      console.log('Sample hidden children:', JSON.stringify(info.sampleHidden, null, 2));
    }
  }

  await browser.close();
}

diagnose();
