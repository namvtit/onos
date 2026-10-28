import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const now = new Date();
const timestamp = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);
const OUT_DIR = path.resolve(`audit/mobile-audit-${timestamp}`);
fs.mkdirSync(OUT_DIR, { recursive: true });

console.log(`Creating fresh mobile captures in: ${OUT_DIR}`);

async function run() {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/ at 375px mobile viewport...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);

  console.log('Scrolling incrementally through entire page to trigger all reveals & lazy assets...');
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  let currentScroll = 0;
  const step = 350;

  while (currentScroll < totalHeight) {
    currentScroll += step;
    await page.evaluate((y) => window.scrollTo(0, y), currentScroll);
    await page.waitForTimeout(300);
  }

  // Reach absolute bottom and wait for animations to settle
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // 1. Full-page mobile screenshot
  const fullPagePath = path.join(OUT_DIR, `mobile-fullpage-${timestamp}.png`);
  await page.screenshot({ path: fullPagePath, fullPage: true });
  console.log(`Saved full-page mobile screenshot: ${fullPagePath}`);

  // 2. Separate section screenshots
  const sections = [
    { key: '01-hero', selector: '#home' },
    { key: '02-hero-video', selector: '.hero-video-wrap' },
    { key: '03-about', selector: '#about' },
    { key: '04-products', selector: '#products' },
    { key: '05-workflow', selector: '#workflow' },
    { key: '06-gallery', selector: '#gallery' },
    { key: '07-footer', selector: '#Footer' }
  ];

  const sectionMetrics = [];

  for (const s of sections) {
    const el = await page.$(s.selector);
    if (!el) {
      console.warn(`Section ${s.key} (${s.selector}) not found!`);
      continue;
    }

    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const shotPath = path.join(OUT_DIR, `${s.key}-375px.png`);
    await el.screenshot({ path: shotPath });

    const info = await page.evaluate((sel) => {
      const target = document.querySelector(sel);
      if (!target) return null;
      const cs = window.getComputedStyle(target);
      const r = target.getBoundingClientRect();
      const zeroOp = Array.from(target.querySelectorAll('*')).filter(c => {
        const ccs = window.getComputedStyle(c);
        if (c.matches('.accordion-content') && ccs.display === 'none') return false;
        if (c.matches('.w-slide[aria-hidden="true"]') || c.matches('.w-hidden')) return false;
        if (c.matches('.w-form-done') || c.matches('.w-form-fail')) return false;
        if (c.matches('.pause-state')) return false;
        if (c.tagName === 'DIALOG' && !c.open) return false;
        return ccs.opacity === '0' || ccs.visibility === 'hidden';
      });

      const images = Array.from(target.querySelectorAll('img')).map(img => ({
        src: img.src?.split('/').pop(),
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        renderedWidth: Math.round(img.getBoundingClientRect().width),
        renderedHeight: Math.round(img.getBoundingClientRect().height)
      }));

      return {
        width: Math.round(r.width),
        height: Math.round(r.height),
        opacity: cs.opacity,
        visibility: cs.visibility,
        zeroOpCount: zeroOp.length,
        totalImages: images.length,
        images
      };
    }, s.selector);

    sectionMetrics.push({ key: s.key, selector: s.selector, shotPath, ...info });
    console.log(`Captured ${s.key}: ${info?.width}x${info?.height}px, zeroOpCount=${info?.zeroOpCount}, images=${info?.totalImages}`);
  }

  await context.close();
  await browser.close();

  fs.writeFileSync(
    path.join(OUT_DIR, 'mobile-capture-manifest.json'),
    JSON.stringify({ timestamp, dir: OUT_DIR, fullPagePath, sections: sectionMetrics }, null, 2)
  );

  console.log(`\nAll mobile captures complete! Manifest written to ${path.join(OUT_DIR, 'mobile-capture-manifest.json')}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
