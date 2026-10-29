import { chromium } from '@playwright/test';
import fs from 'node:fs';

async function audit() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // 1. Audit English
  await page.goto('https://onosglobal.pages.dev/', { waitUntil: 'networkidle' });
  const htmlEn = await page.content();
  fs.writeFileSync('audit/live-onos-en.html', htmlEn);

  const dataEn = await page.evaluate(() => {
    function getDetails(el) {
      return {
        tag: el.tagName,
        text: el.innerText ? el.innerText.trim() : '',
        id: el.id,
        className: el.className
      };
    }

    const sections = Array.from(document.querySelectorAll('section, header, footer, main, nav, article')).map(s => ({
      tag: s.tagName,
      id: s.id,
      className: s.className,
      ariaLabel: s.getAttribute('aria-label'),
      headings: Array.from(s.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({ tag: h.tagName, text: h.innerText.trim() })),
      text: s.innerText.trim()
    }));

    const links = Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href'),
      ariaLabel: a.getAttribute('aria-label'),
      title: a.getAttribute('title')
    }));

    const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.innerText.trim(),
      ariaLabel: b.getAttribute('aria-label'),
      id: b.id,
      dataAttrs: Object.fromEntries(Object.entries(b.dataset))
    }));

    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.getAttribute('src'),
      currentSrc: img.currentSrc,
      alt: img.getAttribute('alt'),
      loading: img.getAttribute('loading'),
      dataAttrs: Object.fromEntries(Object.entries(img.dataset))
    }));

    const selects = Array.from(document.querySelectorAll('select')).map(sel => ({
      id: sel.id,
      name: sel.name,
      options: Array.from(sel.options).map(o => ({ value: o.value, text: o.text, selected: o.selected }))
    }));

    const details = Array.from(document.querySelectorAll('details')).map(d => ({
      summary: d.querySelector('summary') ? d.querySelector('summary').innerText.trim() : '',
      content: d.innerText.trim()
    }));

    return { sections, links, buttons, images, selects, details, fullText: document.body.innerText };
  });

  fs.writeFileSync('audit/live-onos-en.json', JSON.stringify(dataEn, null, 2));

  // 2. Audit Vietnamese
  await page.goto('https://onosglobal.pages.dev/?lang=vi', { waitUntil: 'networkidle' });
  const htmlVi = await page.content();
  fs.writeFileSync('audit/live-onos-vi.html', htmlVi);

  const dataVi = await page.evaluate(() => {
    const details = Array.from(document.querySelectorAll('details')).map(d => ({
      summary: d.querySelector('summary') ? d.querySelector('summary').innerText.trim() : '',
      content: d.innerText.trim()
    }));
    return { fullText: document.body.innerText, details };
  });
  fs.writeFileSync('audit/live-onos-vi.json', JSON.stringify(dataVi, null, 2));

  console.log('Successfully captured live EN and VI data and HTML.');
  await browser.close();
}

audit().catch(console.error);
