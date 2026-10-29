import fs from 'node:fs';

const html = fs.readFileSync('audit/live-onos-en.html', 'utf-8');

// Extract all [data-en][data-vi]
const re = /<([^>]+)data-en="([^"]+)"([^>]+)data-vi="([^"]+)"/g;
let m;
const pairs = [];
const seen = new Set();

// Let's use regex or DOM parsing
import { chromium } from '@playwright/test';

async function parseAll() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  const bilingual = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('[data-en][data-vi]').forEach(el => {
      list.push({
        en: el.getAttribute('data-en'),
        vi: el.getAttribute('data-vi'),
        tag: el.tagName,
        parentTag: el.parentElement?.tagName
      });
    });

    document.querySelectorAll('[data-alt-en][data-alt-vi]').forEach(el => {
      list.push({
        en: el.getAttribute('data-alt-en'),
        vi: el.getAttribute('data-alt-vi'),
        type: 'alt',
        src: el.getAttribute('src')
      });
    });

    return list;
  });

  fs.writeFileSync('audit/bilingual-dictionary.json', JSON.stringify(bilingual, null, 2));
  console.log('Saved bilingual dictionary with entries:', bilingual.length);
  await browser.close();
}

parseAll().catch(console.error);
