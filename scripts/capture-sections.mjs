import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('audit/visual-forensics/sections');
fs.mkdirSync(path.join(OUT_DIR, 'manufactt'), { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, 'local-current'), { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, 'onos-live'), { recursive: true });

async function run() {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. Manufactt sections at 1440
  console.log('Capturing Manufactt sections (1440px)...');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('https://manufactt-wbs.webflow.io/', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(3000);
    await page.addStyleTag({
      content: `*, *::before, *::after { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }`,
    });

    const sections = [
      { name: '01-nav', sel: '.navbar-wrapper, .navbar' },
      { name: '02-hero', sel: '.hero-section' },
      { name: '03-hero-video', sel: '.hero-video-wrap' },
      { name: '04-about', sel: '.about-section' },
      { name: '05-service', sel: '.service-section' },
      { name: '06-product', sel: '.product-section' },
      { name: '07-industry', sel: '.industry-section' },
      { name: '08-case-study', sel: '.case-study-section' },
      { name: '09-why-choose', sel: '.why-choose-section' },
      { name: '10-testimonial', sel: '.testimonial-section' },
      { name: '11-blog', sel: '.blog-section' },
      { name: '12-footer', sel: '.footer' },
    ];

    for (const s of sections) {
      const el = await page.$(s.sel);
      if (el) {
        await el.screenshot({ path: path.join(OUT_DIR, 'manufactt', `${s.name}-1440.png`) });
      } else {
        console.warn(`Manufactt missing: ${s.name} (${s.sel})`);
      }
    }
    await page.close();
  }

  // 2. Local-current sections at 1440
  console.log('Capturing Local-current sections (1440px)...');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.addStyleTag({
      content: `*, *::before, *::after { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }`,
    });

    const sections = [
      { name: '01-nav', sel: '.onos-navbar, .navbar' },
      { name: '02-hero', sel: '.hero-section' },
      { name: '03-hero-photo', sel: '.hero-video-wrap' },
      { name: '04-about', sel: '.about-section' },
      { name: '05-capabilities', sel: '#capabilities' },
      { name: '06-production-fit', sel: '#production-fit' },
      { name: '07-network', sel: '#network' },
      { name: '08-process', sel: '#process' },
      { name: '09-gallery', sel: '#gallery' },
      { name: '10-ecosystem', sel: '#ecosystem' },
      { name: '11-faq', sel: '#faq' },
      { name: '12-contact', sel: '#contact' },
      { name: '13-footer', sel: '.footer' },
    ];

    for (const s of sections) {
      const el = await page.$(s.sel);
      if (el) {
        await el.screenshot({ path: path.join(OUT_DIR, 'local-current', `${s.name}-1440.png`) });
      } else {
        console.warn(`Local missing: ${s.name} (${s.sel})`);
      }
    }
    await page.close();
  }

  // 3. Mobile viewports (375px) for key sections
  console.log('Capturing 375px section snapshots...');
  for (const t of [
    { name: 'manufactt', url: 'https://manufactt-wbs.webflow.io/', nav: '.navbar-wrapper, .navbar', hero: '.hero-section', footer: '.footer' },
    { name: 'local-current', url: 'http://localhost:3000/', nav: '.onos-navbar, .navbar', hero: '.hero-section', footer: '.footer' },
  ]) {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);
    await page.addStyleTag({
      content: `*, *::before, *::after { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }`,
    });

    for (const [key, sel] of Object.entries({ nav: t.nav, hero: t.hero, footer: t.footer })) {
      const el = await page.$(sel);
      if (el) {
        await el.screenshot({ path: path.join(OUT_DIR, t.name, `${key}-375.png`) });
      }
    }
    await page.close();
  }

  await browser.close();
  console.log('Section screenshots complete!');
}

run().catch(err => {
  console.error('Section capture failed:', err);
  process.exit(1);
});
