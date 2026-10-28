import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const QA_DIR = path.resolve('audit/qa/rebuilt');
const FULL_DIR = path.resolve('audit/qa/full');
fs.mkdirSync(QA_DIR, { recursive: true });
fs.mkdirSync(FULL_DIR, { recursive: true });

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 800 },
  { name: '768', width: 768, height: 1024 },
  { name: '375', width: 375, height: 812 },
];

async function capture() {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. Full-page captures across all 4 viewports
  for (const vp of VIEWPORTS) {
    console.log(`Capturing full page at ${vp.name}px...`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);

    // Freeze animations gracefully without breaking noise texture opacity
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        .noise-overlay { opacity: 0.04 !important; }
      `,
    });

    await page.screenshot({
      path: path.join(FULL_DIR, `rebuilt-${vp.name}.png`),
      fullPage: true,
    });
    await page.close();
  }

  // Vietnamese version capture at 1440
  console.log('Capturing Vietnamese version at 1440px...');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3000/?lang=vi', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(FULL_DIR, `rebuilt-vi-1440.png`),
      fullPage: true,
    });
    await page.close();
  }

  // 2. Section screenshots at 1440px
  console.log('Capturing individual sections at 1440px...');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);

    const sections = [
      { name: '01-nav', sel: '.navbar' },
      { name: '02-hero', sel: '.hero-section' },
      { name: '03-hero-video', sel: '.hero-video-wrap' },
      { name: '04-about', sel: '.about-section' },
      { name: '05-service', sel: '.service-section' },
      { name: '06-product', sel: '.product-section' },
      { name: '07-industry', sel: '.industry-section' },
      { name: '08-case-study', sel: '.case-study-section' },
      { name: '09-why-choose', sel: '.why-choose-section' },
      { name: '10-testimonial', sel: '.testimonial-section' },
      { name: '11-faq', sel: '.faqs-section' },
      { name: '12-contact', sel: '.contact-section' },
      { name: '13-footer', sel: '.footer' },
    ];

    for (const s of sections) {
      const el = await page.$(s.sel);
      if (el) {
        await el.screenshot({ path: path.join(QA_DIR, `${s.name}-1440.png`) });
        console.log(`  ✓ Saved ${s.name}-1440.png`);
      } else {
        console.error(`  ✗ Section not found: ${s.name} (${s.sel})`);
      }
    }
    await page.close();
  }

  // 3. Section screenshots at 375px (mobile)
  console.log('Capturing individual sections at 375px...');
  {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);

    const sections = [
      { name: '01-nav', sel: '.navbar' },
      { name: '02-hero', sel: '.hero-section' },
      { name: '03-hero-video', sel: '.hero-video-wrap' },
      { name: '04-about', sel: '.about-section' },
      { name: '05-service', sel: '.service-section' },
      { name: '06-product', sel: '.product-section' },
      { name: '07-industry', sel: '.industry-section' },
      { name: '08-case-study', sel: '.case-study-section' },
      { name: '09-why-choose', sel: '.why-choose-section' },
      { name: '10-testimonial', sel: '.testimonial-section' },
      { name: '11-faq', sel: '.faqs-section' },
      { name: '12-contact', sel: '.contact-section' },
      { name: '13-footer', sel: '.footer' },
    ];

    for (const s of sections) {
      const el = await page.$(s.sel);
      if (el) {
        await el.screenshot({ path: path.join(QA_DIR, `${s.name}-375.png`) });
        console.log(`  ✓ Saved ${s.name}-375.png`);
      } else {
        console.error(`  ✗ Mobile section not found: ${s.name} (${s.sel})`);
      }
    }
    await page.close();
  }

  await browser.close();
  console.log('Capture complete!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
