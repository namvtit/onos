import { chromium } from '@playwright/test';

async function verify() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  console.log('=== Checking Desktop (1440px) ===');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Measure sections and cards
  const metrics = await page.evaluate(() => {
    const nav = document.querySelector('.navbar')?.getBoundingClientRect();
    const hero = document.querySelector('.hero-section')?.getBoundingClientRect();
    const about = document.querySelector('.about-section')?.getBoundingClientRect();
    const services = document.querySelector('.service-section')?.getBoundingClientRect();
    const serviceItems = Array.from(document.querySelectorAll('.service-list-item')).map(el => el.getBoundingClientRect().height);
    const products = document.querySelector('.product-section')?.getBoundingClientRect();
    const productCards = Array.from(document.querySelectorAll('.product-info-main')).map(el => el.getBoundingClientRect().height);
    const network = document.querySelector('.case-study-section')?.getBoundingClientRect();
    const whyChoose = document.querySelector('.why-choose-section')?.getBoundingClientRect();
    const testimonial = document.querySelector('.testimonial-section')?.getBoundingClientRect();
    const faq = document.querySelector('.faqs-section')?.getBoundingClientRect();
    const contact = document.querySelector('.contact-section')?.getBoundingClientRect();
    const footer = document.querySelector('.footer')?.getBoundingClientRect();

    return {
      navHeight: nav?.height,
      heroHeight: hero?.height,
      aboutHeight: about?.height,
      servicesHeight: services?.height,
      serviceItems,
      productsHeight: products?.height,
      productCards: productCards.slice(0, 4),
      networkHeight: network?.height,
      whyChooseHeight: whyChoose?.height,
      testimonialHeight: testimonial?.height,
      faqHeight: faq?.height,
      contactHeight: contact?.height,
      footerHeight: footer?.height
    };
  });

  console.log('--- RECONSTRUCTED METRICS (1440px) ---');
  console.log(JSON.stringify(metrics, null, 2));

  // Capture full screenshot at 1440px
  await page.screenshot({ path: 'audit/deep-forensics/reconstructed-1440.png', fullPage: true });

  // Test Button Hover
  const heroBtn = await page.$('.hero-button .primary-button');
  if (heroBtn) {
    await heroBtn.hover();
    await page.waitForTimeout(300);
    await heroBtn.screenshot({ path: 'audit/deep-forensics/reconstructed-btn-hover.png' });
    console.log('Captured button hover state');
  }

  // Test Service Row Hover
  const serviceRow = await page.$('.service-list-item a.service-info-link');
  if (serviceRow) {
    await serviceRow.hover();
    await page.waitForTimeout(300);
    await serviceRow.screenshot({ path: 'audit/deep-forensics/reconstructed-service-hover.png' });
    console.log('Captured service row hover state');
  }

  console.log('=== Checking Mobile (375px) ===');
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: 'audit/deep-forensics/reconstructed-375.png', fullPage: true });

  await browser.close();
  console.log('Verification complete!');
}

verify();
