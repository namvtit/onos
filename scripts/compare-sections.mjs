import { chromium } from '@playwright/test';
import fs from 'node:fs';

async function audit() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const pageM = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pageL = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await pageM.goto('https://manufactt-wbs.webflow.io/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await pageM.waitForTimeout(2500);
  await pageL.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await pageL.waitForTimeout(1500);

  // Compare section metrics
  const sections = [
    { name: 'Navbar', selector: '.navbar' },
    { name: 'Hero', selector: '.hero-section' },
    { name: 'Hero Video', selector: '.hero-video-section' },
    { name: 'About', selector: '.about-section' },
    { name: 'Services', selector: '.service-section' },
    { name: 'Products / What We Manufacture', selector: '.product-section' },
    { name: 'Industry / Production Finder', selector: '.industry-section' },
    { name: 'Case Studies / Network Slider', selector: '.case-study-section' },
    { name: 'Why Choose Us', selector: '.why-choose-section' },
    { name: 'Testimonials & Gallery', selector: '.testimonial-section' },
    { name: 'FAQ', selector: '.faqs-section' },
    { name: 'Contact / Blog', selector: '.blog-section' },
    { name: 'Footer', selector: '.footer' },
  ];

  const results = [];

  for (const s of sections) {
    const dataM = await pageM.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return {
        exists: true,
        height: r.height,
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        bg: cs.backgroundColor,
        display: cs.display
      };
    }, s.selector);

    const dataL = await pageL.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return {
        exists: true,
        height: r.height,
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        bg: cs.backgroundColor,
        display: cs.display
      };
    }, s.selector);

    results.push({ section: s.name, selector: s.selector, manufactt: dataM, local: dataL });
  }

  // Also inspect typography on both
  const typoM = await pageM.evaluate(() => {
    return Array.from(document.querySelectorAll('h1, h2, h3, .pre-section-title')).slice(0, 15).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        class: el.className,
        text: el.textContent?.trim().slice(0, 30),
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color
      };
    });
  });

  const typoL = await pageL.evaluate(() => {
    return Array.from(document.querySelectorAll('h1, h2, h3, .pre-section-title')).slice(0, 15).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        class: el.className,
        text: el.textContent?.trim().slice(0, 30),
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color
      };
    });
  });

  fs.writeFileSync('audit/deep-forensics/section-comparison.json', JSON.stringify({ sections: results, typoM, typoL }, null, 2));
  console.log('Saved section comparison to audit/deep-forensics/section-comparison.json');

  await browser.close();
}

audit();
