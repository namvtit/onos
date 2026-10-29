import fs from 'node:fs';

const html = fs.readFileSync('raw-webflow/index.html', 'utf8');
const match = html.match(/<div[^>]*class="[^"]*service-info[^"]*"[\s\S]*?<\/section>/i);
if (match) {
  // Print first 4000 characters
  console.log(match[0].slice(0, 4000));
} else {
  console.log('service-info not found');
}
