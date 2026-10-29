import fs from 'node:fs';

const html = fs.readFileSync('audit/live-onos-en.html', 'utf-8');

// Find facility carousel HTML
const idx = html.indexOf('class="facility-carousel');
if (idx !== -1) {
  console.log(html.slice(idx, idx + 3500));
} else {
  console.log('facility-carousel not found');
}
