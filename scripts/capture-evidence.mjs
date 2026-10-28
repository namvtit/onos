import { chromium } from '@playwright/test';
import fs from 'node:fs';

const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
const outputDir = `audit/targeted-fixes-${timestamp}`;
fs.mkdirSync(outputDir, { recursive: true });

async function capture() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  // 1. Mobile Capture (375px)
  console.log('Capturing mobile (375px)...');
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  // Progressive scroll to initialize triggers
  const sections = ['#home', '#about', '#capabilities', '#products', '#production-fit', '#network', '#workflow', '#gallery', '#faq', '#contact'];
  for (const sel of sections) {
    const el = await mobilePage.$(sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(600);
    }
  }
  await mobilePage.waitForTimeout(1500);

  // Capture full page
  await mobilePage.screenshot({ path: `${outputDir}/mobile-375-full.png`, fullPage: true });

  // Capture sections
  const mobileSections = [
    { name: 'mobile-hero.png', sel: '#home' },
    { name: 'mobile-hero-video.png', sel: '.hero-video-wrap' },
    { name: 'mobile-about.png', sel: '#about' },
    { name: 'mobile-products.png', sel: '#products' },
    { name: 'mobile-workflow.png', sel: '#workflow' },
    { name: 'mobile-gallery.png', sel: '#gallery' },
    { name: 'mobile-footer.png', sel: '.footer' },
  ];

  for (const item of mobileSections) {
    const el = await mobilePage.$(item.sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(400);
      await el.screenshot({ path: `${outputDir}/${item.name}` });
    }
  }

  // 2. Desktop Capture (1440px)
  console.log('Capturing desktop (1440px)...');
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);

  for (const sel of sections) {
    const el = await desktopPage.$(sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(600);
    }
  }
  await desktopPage.waitForTimeout(1500);

  // Capture full page
  await desktopPage.screenshot({ path: `${outputDir}/desktop-1440-full.png`, fullPage: true });

  // Capture sections
  const desktopSections = [
    { name: 'desktop-hero.png', sel: '#home' },
    { name: 'desktop-hero-video.png', sel: '.hero-video-wrap' },
    { name: 'desktop-about.png', sel: '#about' },
    { name: 'desktop-products.png', sel: '#products' },
    { name: 'desktop-workflow.png', sel: '#workflow' },
    { name: 'desktop-gallery.png', sel: '#gallery' },
    { name: 'desktop-footer.png', sel: '.footer' },
  ];

  for (const item of desktopSections) {
    const el = await desktopPage.$(item.sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(400);
      await el.screenshot({ path: `${outputDir}/${item.name}` });
    }
  }

  await browser.close();
  console.log(`All evidence captured successfully in ${outputDir}`);
}

capture();
