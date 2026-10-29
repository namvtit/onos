import { chromium } from 'playwright';
import fs from 'node:fs';

async function diagnose() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 1. Text overlap detection: find any elements whose bounding boxes collide or text overflows container
  const textCollisions = await page.evaluate(() => {
    const collisions = [];
    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, a, span, button'));

    for (let i = 0; i < elements.length; i++) {
      const el1 = elements[i];
      if (!el1.offsetParent || el1.textContent.trim() === '') continue;
      const rect1 = el1.getBoundingClientRect();
      if (rect1.width === 0 || rect1.height === 0) continue;

      // Check text overflow
      if (el1.scrollWidth > el1.clientWidth + 2 && getComputedStyle(el1).overflow !== 'visible') {
        collisions.push({
          type: 'text_overflow',
          tag: el1.tagName,
          class: el1.className,
          text: el1.textContent.trim().slice(0, 40),
          clientWidth: el1.clientWidth,
          scrollWidth: el1.scrollWidth
        });
      }

      // Check sibling overlap
      for (let j = i + 1; j < elements.length; j++) {
        const el2 = elements[j];
        if (!el2.offsetParent || el2.textContent.trim() === '') continue;
        if (el1.contains(el2) || el2.contains(el1)) continue;

        const rect2 = el2.getBoundingClientRect();
        if (rect2.width === 0 || rect2.height === 0) continue;

        // Check intersection
        const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
        const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

        if (overlapX > 5 && overlapY > 5) {
          // Verify if they are actually overlapping visually (not an intentional absolute badge or background)
          const style1 = getComputedStyle(el1);
          const style2 = getComputedStyle(el2);
          if (style1.position !== 'absolute' && style2.position !== 'absolute') {
            collisions.push({
              type: 'box_collision',
              el1: { tag: el1.tagName, class: el1.className, text: el1.textContent.trim().slice(0, 30), rect: rect1 },
              el2: { tag: el2.tagName, class: el2.className, text: el2.textContent.trim().slice(0, 30), rect: rect2 },
              overlapArea: overlapX * overlapY
            });
          }
        }
      }
    }
    return collisions;
  });

  console.log(`Text Collisions / Overflows found:`, JSON.stringify(textCollisions, null, 2));

  // 2. Inspect Services section geometry & hover
  const servicesReport = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('#capabilities .service-wrap, #capabilities [class*="service"]'));
    return items.map(item => ({
      className: item.className,
      rect: item.getBoundingClientRect(),
      computedHeight: getComputedStyle(item).height,
      computedPadding: getComputedStyle(item).padding,
      computedMargin: getComputedStyle(item).margin
    }));
  });
  console.log(`Services items:`, servicesReport.length);

  await browser.close();
}

diagnose().catch(console.error);
