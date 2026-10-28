import { chromium } from '@playwright/test';

async function inspectCards() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Scroll to products
  const products = await page.$('#products');
  await products.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  const cards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.product-info-main')).map((card, i) => {
      const img = card.querySelector('.product-image');
      const wrap = card.querySelector('.product-image-wrapper');
      return {
        index: i,
        name: card.querySelector('.product-name')?.textContent?.trim(),
        cardH: card.getBoundingClientRect().height,
        wrapH: wrap?.getBoundingClientRect().height,
        wrapDisplay: wrap ? window.getComputedStyle(wrap).display : null,
        imgH: img?.getBoundingClientRect().height,
        imgW: img?.getBoundingClientRect().width,
        imgSrc: img?.src?.split('/').pop(),
        imgComplete: img?.complete,
        imgNatural: `${img?.naturalWidth}x${img?.naturalHeight}`
      };
    });
  });

  console.log('LOCAL PRODUCT CARDS AFTER SCROLL:');
  console.log(JSON.stringify(cards, null, 2));

  await browser.close();
}

inspectCards();
