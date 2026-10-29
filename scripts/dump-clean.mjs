import fs from 'node:fs';

const en = JSON.parse(fs.readFileSync('audit/onos-en-structured.json'));
const vi = JSON.parse(fs.readFileSync('audit/onos-vi-structured.json'));

console.log('=== CAPABILITIES ===');
console.log('EN:', JSON.stringify(en.capabilities, null, 2));
console.log('VI:', JSON.stringify(vi.capabilities, null, 2));

console.log('\n=== FINDER ===');
console.log('EN:', JSON.stringify(en.finder, null, 2));
console.log('VI:', JSON.stringify(vi.finder, null, 2));

console.log('\n=== PLANTS ===');
console.log('EN:', JSON.stringify(en.plants, null, 2));
console.log('VI:', JSON.stringify(vi.plants, null, 2));

console.log('\n=== CAROUSEL SLIDES ===');
console.log('EN:', JSON.stringify(en.carouselSlides, null, 2));
console.log('VI:', JSON.stringify(vi.carouselSlides, null, 2));

console.log('\n=== WORKFLOW ===');
console.log('EN:', JSON.stringify(en.workflow, null, 2));
console.log('VI:', JSON.stringify(vi.workflow, null, 2));

console.log('\n=== GALLERY ===');
console.log('EN:', JSON.stringify(en.gallery, null, 2));
console.log('VI:', JSON.stringify(vi.gallery, null, 2));

console.log('\n=== ECOSYSTEM ===');
console.log('EN:', JSON.stringify(en.ecosystem, null, 2));
console.log('VI:', JSON.stringify(vi.ecosystem, null, 2));

console.log('\n=== FAQ ===');
console.log('EN:', JSON.stringify(en.faq, null, 2));
console.log('VI:', JSON.stringify(vi.faq, null, 2));

console.log('\n=== CONTACT ===');
console.log('EN:', JSON.stringify(en.contact, null, 2));
console.log('VI:', JSON.stringify(vi.contact, null, 2));
