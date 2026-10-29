import { chromium } from '@playwright/test';

async function diagnose() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // 1. Check overflow elements at 1024px
  const overflowElements = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const overflowing = [];
    document.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 5) {
        overflowing.push({
          tag: el.tagName,
          id: el.id,
          className: el.className,
          right: rect.right,
          width: rect.width,
          outerHTML: el.outerHTML.slice(0, 100)
        });
      }
    });
    return overflowing.slice(0, 10);
  });

  console.log('--- Overflowing elements at 1024px ---');
  console.log(JSON.stringify(overflowElements, null, 2));

  // 2. Check slider arrow visibility at 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  const arrowStyle = await page.evaluate(() => {
    const arrow = document.querySelector('#network .slider-arrow-left');
    if (!arrow) return 'arrow not found';
    const cs = window.getComputedStyle(arrow);
    return {
      display: cs.display,
      visibility: cs.visibility,
      opacity: cs.opacity,
      width: cs.width,
      height: cs.height,
      rect: arrow.getBoundingClientRect()
    };
  });

  console.log('--- Slider Arrow Style ---');
  console.log(JSON.stringify(arrowStyle, null, 2));

  // 3. Check capability clickability
  const serviceClickable = await page.evaluate(() => {
    const links = document.querySelectorAll('.service-info-link');
    return Array.from(links).map((l, i) => {
      const rect = l.getBoundingClientRect();
      const topEl = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return {
        i,
        rect,
        topElTag: topEl?.tagName,
        topElClass: topEl?.className,
        contains: l.contains(topEl)
      };
    });
  });

  console.log('--- Service Clickable ---');
  console.log(JSON.stringify(serviceClickable, null, 2));

  await browser.close();
}

diagnose().catch(console.error);
