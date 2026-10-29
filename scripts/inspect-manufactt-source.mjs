import fs from 'node:fs';

const html = fs.readFileSync('raw-webflow/index.html', 'utf8');

// Extract Services section
const serviceMatch = html.match(/<section[^>]*class="[^"]*service[^"]*"[\s\S]*?<\/section>/i) ||
                     html.match(/<div[^>]*class="[^"]*section[^"]*service[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i) ||
                     html.match(/class="[^"]*service-wrap[^"]*"[\s\S]{1,2000}/i);

console.log('--- Services HTML snippet ---');
console.log(serviceMatch ? serviceMatch[0].slice(0, 1500) : 'Not found');

// Extract buttons structure
const buttonMatches = [...html.matchAll(/<a[^>]*class="[^"]*button[^"]*"[^>]*>[\s\S]*?<\/a>/gi)];
console.log('\n--- Button examples (first 3) ---');
buttonMatches.slice(0, 3).forEach((m, i) => console.log(`Button ${i + 1}:\n`, m[0]));

// Search for data-w-id in raw-webflow/index.html to understand Webflow IX2 interactions
const interactions = [...html.matchAll(/data-w-id="([^"]+)"/g)].map(m => m[1]);
console.log(`\nTotal data-w-id interaction triggers in raw-webflow/index.html:`, interactions.length);

// Let's check webflow JS or IX2 interaction definitions if present in raw-webflow/index.html or external scripts
const scriptTags = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1]);
console.log('\nScript tags:', scriptTags);
