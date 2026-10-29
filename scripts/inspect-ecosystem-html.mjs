import fs from 'node:fs';

const html = fs.readFileSync('audit/live-onos-en.html', 'utf-8');

const idx = html.indexOf('id="ecosystem"');
if (idx !== -1) {
  console.log(html.slice(idx, idx + 3000));
}
