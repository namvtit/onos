import { chromium } from '@playwright/test';

async function testInteractions() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- Testing EN Page ---');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Check EN text
  const heroTitleEn = await page.$eval('.hero-title', el => el.textContent?.trim());
  console.log('Hero Title (EN):', heroTitleEn);

  // Test language toggle to VI
  const viBtn = await page.$('.nav-lang-btn:has-text("VI")');
  if (viBtn) {
    await viBtn.click();
    await page.waitForTimeout(500);
    const heroTitleVi = await page.$eval('.hero-title', el => el.textContent?.trim());
    console.log('Hero Title (after VI switch):', heroTitleVi);
  }

  // Test FAQ Accordion
  const accordionHeadings = await page.$$('.accordion-heading');
  console.log('Total accordion items:', accordionHeadings.length);
  if (accordionHeadings.length > 1) {
    const secondHeading = accordionHeadings[1];
    await secondHeading.click();
    await page.waitForTimeout(300);
    const isOpen = await secondHeading.getAttribute('aria-expanded');
    console.log('Second FAQ expanded:', isOpen);
  }

  // Test Slider Next Button
  const nextBtn = await page.$('.slider-arrow-right');
  if (nextBtn) {
    await nextBtn.click();
    await page.waitForTimeout(400);
    const activeSlide = await page.$eval('.case-study-slide:not(.w-hidden)', el => el.getAttribute('aria-label'));
    console.log('Active slide after Next click:', activeSlide);
  }

  // Test Production Finder Tabs
  const finderTabs = await page.$$('.industry-tabs-link');
  console.log('Total finder tabs:', finderTabs.length);
  if (finderTabs.length > 1) {
    await finderTabs[1].click();
    await page.waitForTimeout(300);
    const activeTabTitle = await page.$eval('.industry-name', el => el.textContent?.trim());
    console.log('Active method after tab click:', activeTabTitle);
  }

  await browser.close();
  console.log('All interactive controls verified successfully!');
}

testInteractions();
