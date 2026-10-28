import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const SECTIONS_DIR = path.resolve('audit/qa-sections');
const MOBILE_DIR = path.resolve('audit/qa-sections/mobile');
const FORENSICS_DIR = path.resolve('audit/deep-forensics');

fs.mkdirSync(SECTIONS_DIR, { recursive: true });
fs.mkdirSync(MOBILE_DIR, { recursive: true });
fs.mkdirSync(FORENSICS_DIR, { recursive: true });

const SECTION_SELECTORS = [
  { name: '01-navbar', selector: '.navbar' },
  { name: '02-hero', selector: '#home' },
  { name: '03-hero-video', selector: '.hero-video-wrap' },
  { name: '04-about', selector: '#about' },
  { name: '05-capabilities', selector: '#capabilities' },
  { name: '06-products', selector: '#products' },
  { name: '07-production-fit', selector: '#production-fit' },
  { name: '08-network', selector: '#network' },
  { name: '09-workflow', selector: '#workflow' },
  { name: '10-gallery', selector: '#gallery' },
  { name: '11-faq', selector: '#faq' },
  { name: '12-contact', selector: '#contact' },
  { name: '13-footer', selector: '#Footer' },
];

async function captureViewport(browser, width, height, isMobile = false) {
  const prefix = isMobile ? 'mobile' : 'desktop';
  console.log(`\n=== Capturing ${prefix} (${width}x${height}) ===`);
  const page = await browser.newPage({ viewport: { width, height } });

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // Scroll through each section sequentially to trigger all scroll reveals
  for (const s of SECTION_SELECTORS) {
    const el = await page.$(s.selector);
    if (!el) {
      console.warn(`Section ${s.name} (${s.selector}) not found`);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600); // Allow animation to start and settle
  }

  // Scroll to absolute bottom and wait for any footer animations
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);

  // Scroll back to top smoothly
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);

  const outDir = isMobile ? MOBILE_DIR : SECTIONS_DIR;

  // Now capture individual section screenshots
  const metrics = [];
  for (const s of SECTION_SELECTORS) {
    const el = await page.$(s.selector);
    if (!el) continue;

    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const shotPath = path.join(outDir, `${s.name}.png`);
    await el.screenshot({ path: shotPath });

    const info = await page.evaluate((sel) => {
      const target = document.querySelector(sel);
      if (!target) return null;
      const cs = window.getComputedStyle(target);
      const r = target.getBoundingClientRect();
      const zeroOp = Array.from(target.querySelectorAll('*')).filter(c => {
        const ccs = window.getComputedStyle(c);
        return ccs.opacity === '0';
      });
      return {
        height: r.height,
        opacity: cs.opacity,
        display: cs.display,
        visibility: cs.visibility,
        zeroOpCount: zeroOp.length
      };
    }, s.selector);

    metrics.push({ name: s.name, selector: s.selector, ...info });
    console.log(`Captured ${s.name}: H=${Math.round(info?.height || 0)}px, zeroOpacityChildren=${info?.zeroOpCount}`);
  }

  // Capture full-page screenshot
  const fullPagePath = isMobile
    ? path.join(FORENSICS_DIR, 'reconstructed-375.png')
    : path.join(FORENSICS_DIR, 'reconstructed-1440.png');

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: fullPagePath, fullPage: true });
  console.log(`Saved full page screenshot to ${fullPagePath}`);

  await page.close();
  return metrics;
}

async function run() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  const desktopMetrics = await captureViewport(browser, 1440, 900, false);
  const mobileMetrics = await captureViewport(browser, 375, 812, true);

  await browser.close();

  fs.writeFileSync(
    path.join(FORENSICS_DIR, 'section-metrics.json'),
    JSON.stringify({ desktop: desktopMetrics, mobile: mobileMetrics }, null, 2)
  );

  console.log('\n=== ALL CAPTURES COMPLETE ===');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
