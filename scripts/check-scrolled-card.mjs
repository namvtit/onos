import { chromium } from '@playwright/test';

async function checkScrolledCard() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://manufactt-wbs.webflow.io/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Scroll section into view without hovering any card
  const section = await page.$('.product-section');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    const card = document.querySelector('.product-info-main');
    const wrapper = document.querySelector('.product-image-wrapper');
    const img = document.querySelector('.product-image-wrapper img');
    return {
      cardH: window.getComputedStyle(card).height,
      wrapperH: window.getComputedStyle(wrapper).height,
      imgH: window.getComputedStyle(img).height,
      imgNatural: `${img?.naturalWidth}x${img?.naturalHeight}`
    };
  });

  console.log('MANUFACTT SCROLLED (NO HOVER):');
  console.log(data);

  await browser.close();
}

checkScrolledCard();
