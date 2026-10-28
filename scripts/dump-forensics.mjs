import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('audit/visual-forensics/forensics-data.json', 'utf8'));

console.log('=== MANUFACTT (1440px) ===');
console.log('Nav:', data.manufactt['1440'].nav);
console.log('Hero:', data.manufactt['1440'].hero);
console.log('Hero H1:', data.manufactt['1440'].heroH1);
console.log('\nManufactt Sections:');
for (const s of data.manufactt['1440'].sections) {
  console.log(`- tag: ${s.tag}, id: "${s.id}", class: "${s.className}", h: ${s.rect.height}`);
}

console.log('\n=== LOCAL CURRENT (1440px) ===');
console.log('Nav:', data['local-current']['1440'].nav);
console.log('Hero:', data['local-current']['1440'].hero);
console.log('Hero H1:', data['local-current']['1440'].heroH1);
console.log('\nLocal Sections:');
for (const s of data['local-current']['1440'].sections) {
  console.log(`- tag: ${s.tag}, id: "${s.id}", class: "${s.className}", h: ${s.rect.height}`);
}
