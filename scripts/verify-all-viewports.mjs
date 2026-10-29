import { chromium } from '@playwright/test';
import fs from 'node:fs';

const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
const outputDir = `audit/targeted-polish-${timestamp}`;
fs.mkdirSync(outputDir, { recursive: true });

async function verify() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'tablet-1024', width: 1024, height: 900 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-375', width: 375, height: 812 },
  ];

  const results = {};

  for (const vp of viewports) {
    console.log(`Testing ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Scroll through all sections
    const sections = ['#home', '#about', '#capabilities', '#products', '#production-fit', '#network', '#workflow', '#gallery', '#faq', '#contact'];
    for (const sel of sections) {
      const el = await page.$(sel);
      if (el) {
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
      }
    }
    await page.waitForTimeout(1000);

    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    // Check counters
    const counters = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.count')).map(c => ({
        target: c.dataset.target,
        text: c.textContent?.trim()
      }));
    });

    // Check primary button text consistency
    const buttonMismatches = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('.primary-button'));
      const mismatches = [];
      buttons.forEach(b => {
        const text = b.querySelector('.button-text')?.textContent?.trim();
        const hover = b.querySelector('.button-hover-text')?.textContent?.trim();
        if (text && hover && text !== hover) {
          mismatches.push({ text, hover });
        }
      });
      return mismatches;
    });

    // Section specific screenshots
    await page.screenshot({ path: `${outputDir}/${vp.name}-full.png`, fullPage: true });

    const sectionCaptures = [
      { name: `${vp.name}-about.png`, sel: '#about' },
      { name: `${vp.name}-products.png`, sel: '#products' },
      { name: `${vp.name}-workflow.png`, sel: '#workflow' },
      { name: `${vp.name}-gallery.png`, sel: '#gallery' },
      { name: `${vp.name}-footer.png`, sel: '.footer' },
    ];

    if (vp.width === 1440 || vp.width === 375) {
      const heroVideo = await page.$('.hero-video-wrap');
      if (heroVideo) {
        await heroVideo.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await heroVideo.screenshot({ path: `${outputDir}/${vp.name}-hero-media.png` });
      }
      for (const sc of sectionCaptures) {
        const el = await page.$(sc.sel);
        if (el) {
          await el.scrollIntoViewIfNeeded();
          await page.waitForTimeout(300);
          await el.screenshot({ path: `${outputDir}/${sc.name}` });
        }
      }
    }

    results[vp.name] = {
      overflow,
      counters,
      buttonMismatches,
    };

    await page.close();
  }

  await browser.close();

  console.log('=== VERIFICATION RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
  console.log(`Evidence saved in ${outputDir}`);
}

verify();
