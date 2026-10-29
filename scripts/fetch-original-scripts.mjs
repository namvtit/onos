import fs from 'node:fs';

async function fetchScripts() {
  const base = 'https://onosglobal.pages.dev/';
  const scripts = [
    'site.js?v=20261021-refinement',
    'facilities-carousel.js?v=20260927c',
    'production.js?v=5c9ce2d4cf',
    'motion.js?v=667e8e0d02',
    'enterprise.js?v=20260927b'
  ];

  for (const s of scripts) {
    const res = await fetch(base + s);
    const text = await res.text();
    const fname = s.split('?')[0];
    fs.writeFileSync(`audit/${fname}`, text);
    console.log(`Saved audit/${fname} (${text.length} bytes)`);
  }
}

fetchScripts().catch(console.error);
