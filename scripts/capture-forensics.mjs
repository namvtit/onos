import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('audit/visual-forensics');
fs.mkdirSync(path.join(OUT_DIR, 'manufactt'), { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, 'local-current'), { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, 'onos-live'), { recursive: true });

const TARGETS = [
  { name: 'manufactt', url: 'https://manufactt-wbs.webflow.io/' },
  { name: 'local-current', url: 'http://localhost:3000/' },
  { name: 'onos-live', url: 'https://onosglobal.pages.dev/' },
];

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '375', width: 375, height: 812 },
];

async function capture() {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const auditData = {};

  for (const target of TARGETS) {
    auditData[target.name] = {};

    for (const vp of VIEWPORTS) {
      console.log(`Capturing ${target.name} at ${vp.name}px...`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();

      try {
        await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30000 });
      } catch (err) {
        console.warn(`networkidle timed out for ${target.name}, trying domcontentloaded:`, err.message);
        try {
          await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        } catch (e) {
          console.error(`Failed to load ${target.url}:`, e.message);
          await context.close();
          continue;
        }
      }

      // Wait a moment for fonts and images
      await page.waitForTimeout(2000);

      // Disable animations for clean screenshots
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0.001s !important;
            animation-delay: 0s !important;
            transition-duration: 0.001s !important;
            transition-delay: 0s !important;
          }
        `,
      });

      // Full page screenshot
      const fullScreenshotPath = path.join(OUT_DIR, target.name, `full-${vp.name}.png`);
      await page.screenshot({ path: fullScreenshotPath, fullPage: true });

      // Extract section inspection data
      const inspection = await page.evaluate(() => {
        const getElInfo = (el) => {
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          return {
            tag: el.tagName.toLowerCase(),
            id: el.id,
            className: el.className,
            width: rect.width,
            height: rect.height,
            backgroundColor: style.backgroundColor,
            color: style.color,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeight,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
            marginTop: style.marginTop,
            marginBottom: style.marginBottom,
            display: style.display,
            gridTemplateColumns: style.gridTemplateColumns,
            flexDirection: style.flexDirection,
          };
        };

        const nav = document.querySelector('header, nav, .navbar-wrapper, .w-nav, .onos-navbar');
        const hero = document.querySelector('.hero-section, #home, section:first-of-type');
        const heroH1 = document.querySelector('h1, .hero-title');
        const containers = Array.from(document.querySelectorAll('.container, .container-full, [class*="container"]')).map(c => ({
          className: c.className,
          width: c.getBoundingClientRect().width,
          maxWidth: window.getComputedStyle(c).maxWidth,
          paddingLeft: window.getComputedStyle(c).paddingLeft,
          paddingRight: window.getComputedStyle(c).paddingRight,
        }));

        const sections = Array.from(document.querySelectorAll('section, header, footer, .hero-video-wrap')).map(s => ({
          tag: s.tagName.toLowerCase(),
          id: s.id,
          className: (typeof s.className === 'string') ? s.className : '',
          rect: {
            width: s.getBoundingClientRect().width,
            height: s.getBoundingClientRect().height,
            top: s.getBoundingClientRect().top + window.scrollY,
          },
          computed: {
            backgroundColor: window.getComputedStyle(s).backgroundColor,
            paddingTop: window.getComputedStyle(s).paddingTop,
            paddingBottom: window.getComputedStyle(s).paddingBottom,
          }
        }));

        const buttons = Array.from(document.querySelectorAll('.primary-button, .button, [class*="button"]')).slice(0, 5).map(b => ({
          className: b.className,
          text: b.textContent?.trim().slice(0, 30),
          borderRadius: window.getComputedStyle(b).borderRadius,
          padding: window.getComputedStyle(b).padding,
          fontSize: window.getComputedStyle(b).fontSize,
          backgroundColor: window.getComputedStyle(b).backgroundColor,
          color: window.getComputedStyle(b).color,
        }));

        return {
          title: document.title,
          nav: getElInfo(nav),
          hero: getElInfo(hero),
          heroH1: getElInfo(heroH1),
          containers: containers.slice(0, 10),
          sections,
          buttons,
        };
      });

      auditData[target.name][vp.name] = inspection;

      // Section screenshots
      // Let's capture viewport top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(OUT_DIR, target.name, `hero-vp-${vp.name}.png`) });

      await context.close();
    }
  }

  await browser.close();

  fs.writeFileSync(path.join(OUT_DIR, 'forensics-data.json'), JSON.stringify(auditData, null, 2));
  console.log('Forensics capture complete!');
}

capture().catch(err => {
  console.error('Forensics failed:', err);
  process.exit(1);
});
