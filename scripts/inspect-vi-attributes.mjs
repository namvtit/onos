import fs from 'node:fs';

const html = fs.readFileSync('audit/live-onos-en.html', 'utf-8');
const matches = [...html.matchAll(/data-vi="([^"]+)"/g)].map(m => m[1]);
console.log('Total data-vi attributes found:', matches.length);
console.log('Sample data-vi:', matches.slice(0, 15));

// Check if there is an onos script that switches languages
const scriptMatches = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1]);
console.log('Script tags:', scriptMatches);
