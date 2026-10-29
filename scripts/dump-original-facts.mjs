import fs from 'node:fs';

const en = JSON.parse(fs.readFileSync('audit/complete-onos-en.json'));
const vi = JSON.parse(fs.readFileSync('audit/complete-onos-vi.json'));

console.log('--- ORIGINAL EN HERO ---');
console.log(JSON.stringify(en.hero, null, 2));

console.log('--- ORIGINAL EN FACILITIES ---');
console.log(JSON.stringify(en.facilities, null, 2));

console.log('--- ORIGINAL EN PROCESS ---');
console.log(JSON.stringify(en.process, null, 2));

console.log('--- ORIGINAL EN ECOSYSTEM ---');
console.log(JSON.stringify(en.ecosystem, null, 2));

console.log('--- ORIGINAL EN CONTACT ---');
console.log(JSON.stringify(en.contact, null, 2));
