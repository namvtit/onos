import { chromium } from '@playwright/test';

async function checkFooterLogo() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  for (const vp of [1440, 375]) {
    const pageM = await browser.newPage({ viewport: { width: vp, height: 900 } });
    await pageM.goto('https://manufactt-wbs.webflow.io/', { waitUntil: 'domcontentloaded' });
    await pageM.waitForTimeout(1500);

    const mLogo = await pageM.evaluate(() => {
      const info = document.querySelector('.footer-logo-info');
      const logo = document.querySelector('.footer-logo');
      const foot = document.querySelector('.footer');
      const cs = window.getComputedStyle(logo);
      const ics = window.getComputedStyle(info);
      const r = logo?.getBoundingClientRect();
      const fr = foot?.getBoundingClientRect();
      return {
        logoSrc: logo?.src?.split('/').pop(),
        rect: r ? { width: r.width, height: r.height, bottom: r.bottom } : null,
        footerBottom: fr?.bottom,
        overflow: ics.overflow,
        cssText: cs.cssText.slice(0, 200)
      };
    });

    const pageL = await browser.newPage({ viewport: { width: vp, height: 900 } });
    await pageL.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    await pageL.waitForTimeout(1500);

    const lLogo = await pageL.evaluate(() => {
      const info = document.querySelector('.footer-logo-info');
      const logo = document.querySelector('.footer-logo');
      const foot = document.querySelector('.footer');
      const cs = window.getComputedStyle(logo);
      const ics = window.getComputedStyle(info);
      const r = logo?.getBoundingClientRect();
      const fr = foot?.getBoundingClientRect();
      return {
        logoSrc: logo?.src?.split('/').pop(),
        rect: r ? { width: r.width, height: r.height, bottom: r.bottom } : null,
        footerBottom: fr?.bottom,
        overflow: ics.overflow
      };
    });

    console.log(`\n=== VP ${vp}px ===`);
    console.log('Manufactt:', mLogo);
    console.log('Local:', lLogo);

    await pageM.close();
    await pageL.close();
  }
  await browser.close();
}

checkFooterLogo();
