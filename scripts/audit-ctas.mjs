import { chromium } from '@playwright/test';

async function auditCtas() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  const ctas = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a.primary-button, a.download-link, a.button-white, a.hero-bottom-link, a.service-info-link'));
    return buttons.map(b => ({
      text: b.textContent?.replace(/\s+/g, ' ').trim(),
      href: b.getAttribute('href'),
      target: b.getAttribute('target'),
      classes: b.className,
      section: b.closest('section, header, div.navbar, div.footer')?.id || b.closest('section, header, div.navbar, div.footer')?.className?.slice(0, 30)
    }));
  });

  console.log('AUDIT ALL CTAS:');
  console.log(JSON.stringify(ctas, null, 2));

  await browser.close();
}

auditCtas();
