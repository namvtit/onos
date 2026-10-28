import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const FORENSICS_DIR = path.resolve('audit/deep-forensics');
fs.mkdirSync(FORENSICS_DIR, { recursive: true });

async function run() {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log('=== Step 1: Inspecting Original Manufactt Webflow (1440px) ===');
  const mPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await mPage.goto('https://manufactt-wbs.webflow.io/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await mPage.waitForTimeout(3000);

  // Capture live state data from Manufactt
  const manufacttData = await mPage.evaluate(() => {
    const htmlClasses = document.documentElement.className;
    const bodyClasses = document.body.className;

    // Check animations and active scripts
    const hasGsap = typeof window.gsap !== 'undefined';
    const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
    const hasWebflow = typeof window.Webflow !== 'undefined';

    // Measure key containers & typography
    const nav = document.querySelector('.navbar');
    const hero = document.querySelector('.hero-section');
    const heroTitle = document.querySelector('.hero-title');
    const heroBtn = document.querySelector('.hero-button .primary-button');
    const about = document.querySelector('.about-section');
    const serviceRows = Array.from(document.querySelectorAll('.service-item')).map(el => {
      const title = el.querySelector('.service-title')?.textContent?.trim();
      const cs = window.getComputedStyle(el);
      return { title, height: el.getBoundingClientRect().height, cursor: cs.cursor };
    });

    const productSection = document.querySelector('.product-section');
    const productGrid = document.querySelector('.grid-products');
    const industrySection = document.querySelector('.industry-section');
    const industryTabs = Array.from(document.querySelectorAll('.industry-tabs-link')).map(el => el.textContent?.trim());
    const caseStudySection = document.querySelector('.case-study-section');
    const whyChooseSection = document.querySelector('.why-choose-section');
    const testimonialSection = document.querySelector('.testimonial-section');
    const faqSection = document.querySelector('.faqs-section');
    const footer = document.querySelector('.footer');

    // Sample computed styles
    const getStyles = (el) => {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        width: r.width,
        height: r.height,
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        paddingLeft: cs.paddingLeft,
        paddingRight: cs.paddingRight,
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        display: cs.display,
        gap: cs.gap,
        gridTemplateColumns: cs.gridTemplateColumns,
        border: cs.border,
        borderRadius: cs.borderRadius,
        transform: cs.transform,
        opacity: cs.opacity,
      };
    };

    return {
      htmlClasses,
      bodyClasses,
      runtime: { hasGsap, hasScrollTrigger, hasWebflow },
      nav: getStyles(nav),
      hero: getStyles(hero),
      heroTitle: getStyles(heroTitle),
      heroBtn: getStyles(heroBtn),
      about: getStyles(about),
      serviceRows,
      product: getStyles(productSection),
      productGrid: getStyles(productGrid),
      industry: getStyles(industrySection),
      industryTabs,
      caseStudy: getStyles(caseStudySection),
      whyChoose: getStyles(whyChooseSection),
      testimonial: getStyles(testimonialSection),
      faq: getStyles(faqSection),
      footer: getStyles(footer),
    };
  });

  // Capture Manufactt full screenshot with natural animation states
  await mPage.screenshot({ path: path.join(FORENSICS_DIR, 'manufactt-1440-live.png'), fullPage: true });

  // Test hover on primary button in Manufactt
  const mBtn = await mPage.$('.navbar .primary-button');
  if (mBtn) {
    await mBtn.hover();
    await mPage.waitForTimeout(400);
    await mBtn.screenshot({ path: path.join(FORENSICS_DIR, 'manufactt-btn-hover.png') });
  }

  // Test service row hover in Manufactt
  const mService = await mPage.$('.service-item');
  if (mService) {
    await mService.hover();
    await mPage.waitForTimeout(400);
    await mService.screenshot({ path: path.join(FORENSICS_DIR, 'manufactt-service-hover.png') });
  }

  await mPage.close();

  console.log('=== Step 2: Inspecting Live ONOS Website (1440px) ===');
  const oPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await oPage.goto('https://onosglobal.pages.dev/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await oPage.waitForTimeout(2500);

  const onosData = await oPage.evaluate(() => {
    // Extract exact structure, texts, finder logic, and links
    const links = Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.textContent?.trim(),
      href: a.getAttribute('href'),
      target: a.getAttribute('target'),
    }));

    const finderSelect = document.querySelector('#production-method');
    const finderOptions = finderSelect
      ? Array.from(finderSelect.querySelectorAll('option')).map(opt => ({
          value: opt.value,
          text: opt.textContent?.trim(),
        }))
      : [];

    const tabs = Array.from(document.querySelectorAll('[role="tab"], .industry-tabs-link')).map(t => t.textContent?.trim());

    // Extract all sections
    const sections = Array.from(document.querySelectorAll('section, header, footer, main > div')).map(s => ({
      id: s.id,
      className: s.className,
      headings: Array.from(s.querySelectorAll('h1, h2, h3')).map(h => h.textContent?.trim()),
    }));

    return { links, finderOptions, tabs, sections };
  });

  await oPage.screenshot({ path: path.join(FORENSICS_DIR, 'onos-live-1440.png'), fullPage: true });

  // Switch to Vietnamese on live ONOS and inspect
  const viBtn = await oPage.$('button:has-text("VI"), a:has-text("VI"), [data-lang="vi"], .lang-switch button:nth-child(2)');
  if (viBtn) {
    await viBtn.click();
    await oPage.waitForTimeout(1000);
    await oPage.screenshot({ path: path.join(FORENSICS_DIR, 'onos-live-vi-1440.png'), fullPage: true });
  }
  await oPage.close();

  console.log('=== Step 3: Inspecting Local Rebuilt Implementation (1440px) ===');
  const lPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await lPage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await lPage.waitForTimeout(2500);

  const localData = await lPage.evaluate(() => {
    const htmlClasses = document.documentElement.className;
    const bodyClasses = document.body.className;

    const nav = document.querySelector('.navbar');
    const hero = document.querySelector('.hero-section');
    const heroTitle = document.querySelector('.hero-title');
    const heroBtn = document.querySelector('.hero-button .primary-button');
    const about = document.querySelector('.about-section');
    const serviceRows = Array.from(document.querySelectorAll('.service-item')).map(el => {
      const title = el.querySelector('.service-title')?.textContent?.trim();
      const cs = window.getComputedStyle(el);
      return { title, height: el.getBoundingClientRect().height, cursor: cs.cursor };
    });

    const productSection = document.querySelector('.product-section');
    const productGrid = document.querySelector('.grid-products');
    const industrySection = document.querySelector('.industry-section');
    const industryTabs = Array.from(document.querySelectorAll('.industry-tabs-link')).map(el => el.textContent?.trim());
    const caseStudySection = document.querySelector('.case-study-section');
    const whyChooseSection = document.querySelector('.why-choose-section');
    const testimonialSection = document.querySelector('.testimonial-section');
    const faqSection = document.querySelector('.faqs-section');
    const footer = document.querySelector('.footer');

    const getStyles = (el) => {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        width: r.width,
        height: r.height,
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        paddingLeft: cs.paddingLeft,
        paddingRight: cs.paddingRight,
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        display: cs.display,
        gap: cs.gap,
        gridTemplateColumns: cs.gridTemplateColumns,
        border: cs.border,
        borderRadius: cs.borderRadius,
        transform: cs.transform,
        opacity: cs.opacity,
      };
    };

    return {
      htmlClasses,
      bodyClasses,
      nav: getStyles(nav),
      hero: getStyles(hero),
      heroTitle: getStyles(heroTitle),
      heroBtn: getStyles(heroBtn),
      about: getStyles(about),
      serviceRows,
      product: getStyles(productSection),
      productGrid: getStyles(productGrid),
      industry: getStyles(industrySection),
      industryTabs,
      caseStudy: getStyles(caseStudySection),
      whyChoose: getStyles(whyChooseSection),
      testimonial: getStyles(testimonialSection),
      faq: getStyles(faqSection),
      footer: getStyles(footer),
    };
  });

  await lPage.screenshot({ path: path.join(FORENSICS_DIR, 'local-1440-live.png'), fullPage: true });

  // Test local hover on primary button
  const lBtn = await lPage.$('.navbar .primary-button');
  if (lBtn) {
    await lBtn.hover();
    await lPage.waitForTimeout(400);
    await lBtn.screenshot({ path: path.join(FORENSICS_DIR, 'local-btn-hover.png') });
  }

  // Test local service row hover
  const lService = await lPage.$('.service-item');
  if (lService) {
    await lService.hover();
    await lPage.waitForTimeout(400);
    await lService.screenshot({ path: path.join(FORENSICS_DIR, 'local-service-hover.png') });
  }

  await lPage.close();
  await browser.close();

  const comparison = {
    manufactt: manufacttData,
    onos: onosData,
    local: localData,
  };

  fs.writeFileSync(path.join(FORENSICS_DIR, 'forensics-comparison.json'), JSON.stringify(comparison, null, 2));
  console.log('Forensics complete! Saved to audit/deep-forensics/forensics-comparison.json');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
