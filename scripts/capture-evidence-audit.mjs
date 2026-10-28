import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const BASE_OUT = path.resolve('audit/visual-audit-final');

const SECTIONS = [
  { id: '01-navbar', name: 'Navbar', selectorLocal: '.navbar', selectorRef: '.navbar' },
  { id: '02-hero', name: 'Hero', selectorLocal: '#home', selectorRef: '.hero-section' },
  { id: '03-hero-video', name: 'Hero Video Wrap', selectorLocal: '.hero-video-wrap', selectorRef: '.hero-video-wrap' },
  { id: '04-about', name: 'About', selectorLocal: '#about', selectorRef: '.about-section' },
  { id: '05-capabilities', name: 'Capabilities / Services', selectorLocal: '#capabilities', selectorRef: '.service-section' },
  { id: '06-products', name: 'What We Manufacture', selectorLocal: '#products', selectorRef: '.product-section' },
  { id: '07-production-fit', name: 'Production Fit / Industry', selectorLocal: '#production-fit', selectorRef: '.industry-section' },
  { id: '08-network', name: 'Factory Network / Case Study', selectorLocal: '#network', selectorRef: '.case-study-section' },
  { id: '09-workflow', name: 'Workflow / Why Choose Us', selectorLocal: '#workflow', selectorRef: '.why-choose-section' },
  { id: '10-gallery', name: 'Gallery / Testimonials', selectorLocal: '#gallery', selectorRef: '.testimonial-section' },
  { id: '11-faq', name: 'FAQ', selectorLocal: '#faq', selectorRef: '.faqs-section' },
  { id: '12-contact', name: 'Contact', selectorLocal: '#contact', selectorRef: null }, // Manufactt doesn't have inline contact form section
  { id: '13-footer', name: 'Footer', selectorLocal: '#Footer', selectorRef: '.footer' },
];

async function inspectAndCaptureSite(page, siteName, url, vp, isRef = false) {
  const dirName = `${siteName}-${vp.width}`;
  const outDir = path.join(BASE_OUT, dirName);
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\nNavigating to ${url} at ${vp.width}x${vp.height}...`);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch (err) {
    console.warn(`Navigation warning for ${url}:`, err.message);
  }
  await page.waitForTimeout(2000);

  // Smooth scroll through entire page section by section to trigger and settle animations
  console.log(`Scrolling through sections on ${siteName} (${vp.width}px)...`);
  for (const s of SECTIONS) {
    const selector = isRef ? s.selectorRef : s.selectorLocal;
    if (!selector) continue;
    const el = await page.$(selector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
    }
  }

  // Scroll to absolute bottom and wait for footer/marquee
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  // Now capture individual sections and inspect DOM
  const sectionReports = [];

  for (const s of SECTIONS) {
    const selector = isRef ? s.selectorRef : s.selectorLocal;
    if (!selector) {
      sectionReports.push({ id: s.id, name: s.name, exists: false, note: 'Not present in this reference' });
      continue;
    }

    const el = await page.$(selector);
    if (!el) {
      console.warn(`[${siteName}] Section not found: ${s.name} (${selector})`);
      sectionReports.push({ id: s.id, name: s.name, selector, exists: false });
      continue;
    }

    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const shotFile = path.join(outDir, `${s.id}.png`);
    await el.screenshot({ path: shotFile });

    // Detailed forensic DOM inspection
    const details = await page.evaluate((sel) => {
      const target = document.querySelector(sel);
      if (!target) return null;

      const cs = window.getComputedStyle(target);
      const rect = target.getBoundingClientRect();

      // Check ancestor opacity/visibility chain
      let ancestorHidden = false;
      let curr = target.parentElement;
      while (curr && curr !== document.documentElement) {
        const ccs = window.getComputedStyle(curr);
        if (ccs.opacity === '0' || ccs.visibility === 'hidden' || ccs.display === 'none') {
          ancestorHidden = true;
          break;
        }
        curr = curr.parentElement;
      }

      // Check overflow / clipping
      const hasHorizontalOverflow = target.scrollWidth > target.clientWidth + 1;
      const overflowX = cs.overflowX;
      const overflowY = cs.overflowY;

      // Inspect images
      const imgEls = Array.from(target.querySelectorAll('img'));
      const images = imgEls.map(img => {
        const ics = window.getComputedStyle(img);
        const ir = img.getBoundingClientRect();
        return {
          src: img.src?.split('/').slice(-2).join('/'),
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          broken: img.complete && img.naturalWidth === 0,
          renderedWidth: Math.round(ir.width),
          renderedHeight: Math.round(ir.height),
          objectFit: ics.objectFit,
          opacity: ics.opacity,
          display: ics.display
        };
      });

      // Find children with zero opacity or hidden
      const hiddenChildren = Array.from(target.querySelectorAll('*')).filter(c => {
        const ccs = window.getComputedStyle(c);
        // Exclude intentional hidden states like modal dialogs, closed tabs/accordions, form status
        if (c.matches('.accordion-content') && ccs.display === 'none') return false;
        if (c.matches('.w-slide[aria-hidden="true"]') || c.matches('.w-hidden')) return false;
        if (c.matches('.w-form-done') || c.matches('.w-form-fail')) return false;
        if (c.matches('.pause-state')) return false;
        if (c.tagName === 'DIALOG' && !c.open) return false;
        return ccs.opacity === '0' || ccs.visibility === 'hidden';
      }).map(c => ({
        tag: c.tagName,
        className: c.className?.toString().slice(0, 50),
        wId: c.getAttribute('data-w-id'),
        opacity: window.getComputedStyle(c).opacity,
        visibility: window.getComputedStyle(c).visibility,
        textSnippet: c.textContent?.trim().slice(0, 30)
      }));

      // Key typography & geometry metrics
      return {
        exists: true,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        opacity: cs.opacity,
        display: cs.display,
        visibility: cs.visibility,
        ancestorHidden,
        hasHorizontalOverflow,
        scrollWidth: target.scrollWidth,
        clientWidth: target.clientWidth,
        overflowX,
        overflowY,
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        paddingLeft: cs.paddingLeft,
        paddingRight: cs.paddingRight,
        backgroundColor: cs.backgroundColor,
        totalImages: images.length,
        brokenImagesCount: images.filter(i => i.broken).length,
        images: images.slice(0, 8),
        hiddenChildrenCount: hiddenChildren.length,
        hiddenChildrenSample: hiddenChildren.slice(0, 5),
        textLength: target.textContent?.trim().length || 0,
        textPreview: target.textContent?.replace(/\s+/g, ' ').trim().slice(0, 80)
      };
    }, selector);

    sectionReports.push({ id: s.id, name: s.name, selector, ...details });
    console.log(`Captured [${siteName} ${vp.width}px] ${s.name}: H=${details?.height}px, W=${details?.width}px, Imgs=${details?.totalImages} (Broken=${details?.brokenImagesCount}), HiddenChildren=${details?.hiddenChildrenCount}`);
  }

  // Full-page screenshot after scrolling & settling
  const fullPageFile = path.join(outDir, `full-page-${vp.width}.png`);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: fullPageFile, fullPage: true });
  console.log(`Saved full page to ${fullPageFile}`);

  return sectionReports;
}

async function run() {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 375, height: 812 }
  ];

  const fullAudit = {};

  for (const vp of viewports) {
    console.log(`\n========================================`);
    console.log(`AUDITING VIEWPORT: ${vp.name.toUpperCase()} (${vp.width}px)`);
    console.log(`========================================`);

    // 1. Manufactt Reference
    const mContext = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    const mPage = await mContext.newPage();
    const mReport = await inspectAndCaptureSite(mPage, 'manufactt', 'https://manufactt-wbs.webflow.io/', vp, true);
    await mContext.close();

    // 2. Local Implementation
    const lContext = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    const lPage = await lContext.newPage();
    const lReport = await inspectAndCaptureSite(lPage, 'local', 'http://localhost:3000/', vp, false);
    await lContext.close();

    fullAudit[`${vp.width}`] = {
      manufactt: mReport,
      local: lReport
    };
  }

  await browser.close();

  fs.writeFileSync(
    path.join(BASE_OUT, 'audit-report.json'),
    JSON.stringify(fullAudit, null, 2)
  );

  console.log(`\nAudit completed successfully! Saved to audit/visual-audit-final/audit-report.json`);
}

run().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
