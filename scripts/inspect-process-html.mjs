import fs from 'node:fs';

const html = fs.readFileSync('audit/live-onos-en.html', 'utf-8');

const idx = html.indexOf('class="process-layout"');
if (idx !== -1) {
  console.log(html.slice(idx, idx + 2500));
}
