import { chromium } from '@playwright/test';

async function checkNavbar() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const grid = document.querySelector('.grid-nav');
    const brand = document.querySelector('.brand');
    const menu = document.querySelector('.nav-menu');
    const right = document.querySelector('.right-nav');
    const container = document.querySelector('.navbar .container-full');

    return {
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      containerWidth: container?.getBoundingClientRect().width,
      gridWidth: grid?.getBoundingClientRect().width,
      brandRect: brand?.getBoundingClientRect(),
      menuRect: menu?.getBoundingClientRect(),
      rightRect: right?.getBoundingClientRect(),
      menuChildrenWidths: Array.from(menu?.children || []).map(c => ({
        text: c.textContent?.trim(),
        width: c.getBoundingClientRect().width
      }))
    };
  });

  console.log('Navbar measurement at 1024px:', JSON.stringify(info, null, 2));
  await browser.close();
}

checkNavbar().catch(console.error);
