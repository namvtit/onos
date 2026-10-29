import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('audit/live-onos-en.json'));

console.log('=== SECTIONS & HEADINGS ===');
data.sections.forEach(s => {
  if (s.headings && s.headings.length) {
    console.log(`${s.tag} id="${s.id}" class="${s.className}":`);
    s.headings.forEach(h => console.log(`  [${h.tag}] ${h.text}`));
  }
});

console.log('\n=== SELECTS ===');
console.log(JSON.stringify(data.selects, null, 2));

console.log('\n=== DETAILS / FAQ ===');
console.log(JSON.stringify(data.details, null, 2));

console.log('\n=== LINKS ===');
console.log(JSON.stringify(data.links, null, 2));

console.log('\n=== BUTTONS ===');
console.log(JSON.stringify(data.buttons, null, 2));

console.log('\n=== IMAGES ===');
console.log(JSON.stringify(data.images, null, 2));
