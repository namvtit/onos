import { chromium } from '@playwright/test';

async function diffComputedHover() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://manufactt-wbs.webflow.io/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const card = await page.$('.product-info-main');

  const before = await page.evaluate(() => {
    const card = document.querySelector('.product-info-main');
    const wrapper = document.querySelector('.product-image-wrapper');
    const img = document.querySelector('.product-image-wrapper img');
    const getCS = (el) => {
      const cs = window.getComputedStyle(el);
      const res = {};
      for (let i = 0; i < cs.length; i++) {
        const prop = cs[i];
        res[prop] = cs.getPropertyValue(prop);
      }
      return res;
    };
    return {
      card: getCS(card),
      wrapper: getCS(wrapper),
      img: getCS(img)
    };
  });

  await card.hover();
  await page.waitForTimeout(600);

  const after = await page.evaluate(() => {
    const card = document.querySelector('.product-info-main');
    const wrapper = document.querySelector('.product-image-wrapper');
    const img = document.querySelector('.product-image-wrapper img');
    const getCS = (el) => {
      const cs = window.getComputedStyle(el);
      const res = {};
      for (let i = 0; i < cs.length; i++) {
        const prop = cs[i];
        res[prop] = cs.getPropertyValue(prop);
      }
      return res;
    };
    return {
      card: getCS(card),
      wrapper: getCS(wrapper),
      img: getCS(img)
    };
  });

  const diffProps = (b, a) => {
    const diff = {};
    for (const key of Object.keys(b)) {
      if (b[key] !== a[key]) {
        diff[key] = { before: b[key], after: a[key] };
      }
    }
    return diff;
  };

  console.log('DIFF CARD:');
  console.log(diffProps(before.card, after.card));
  console.log('DIFF WRAPPER:');
  console.log(diffProps(before.wrapper, after.wrapper));
  console.log('DIFF IMG:');
  console.log(diffProps(before.img, after.img));

  await browser.close();
}

diffComputedHover();
