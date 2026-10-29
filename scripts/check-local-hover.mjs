import { chromium } from '@playwright/test';

async function checkLocalHover() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const card = await page.$('.product-info-main');
  console.log('Hovering over local product card...');
  await card.hover();
  await page.waitForTimeout(600);

  const hoverStyles = await page.evaluate(() => {
    const wrapper = document.querySelector('.product-image-wrapper');
    const img = document.querySelector('.product-image-wrapper img');
    return {
      wrapperH: window.getComputedStyle(wrapper).height,
      imgH: window.getComputedStyle(img).height,
      imgOpacity: window.getComputedStyle(img).opacity,
      imgTransform: window.getComputedStyle(img).transform
    };
  });

  console.log('ON HOVER IN LOCAL:');
  console.log(hoverStyles);

  await browser.close();
}

checkLocalHover();
