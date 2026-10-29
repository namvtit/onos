import fs from 'node:fs';

const html = fs.readFileSync('audit/live-onos-en.html', 'utf-8');

const idx = html.indexOf('Step 02', 0) !== -1 ? html.indexOf('Step 02', 0) : html.indexOf('02</span><svg');
if (idx !== -1) {
  console.log(html.slice(idx, idx + 2500));
}
