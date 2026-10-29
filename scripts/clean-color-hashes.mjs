import fs from 'node:fs';

const files = [
  'src/components/layout/Footer.tsx',
  'src/components/sections/Ecosystem.tsx',
  'src/components/sections/GalleryTestimonials.tsx',
  'src/components/sections/NetworkSlider.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replaceAll('"#fff"', '"white"')
                   .replaceAll("'#fff'", "'white'")
                   .replaceAll('"#aaa"', '"rgb(170, 170, 170)"')
                   .replaceAll("'#aaa'", "'rgb(170, 170, 170)'")
                   .replaceAll('"#bbb"', '"rgb(187, 187, 187)"')
                   .replaceAll("'#bbb'", "'rgb(187, 187, 187)'");
  fs.writeFileSync(file, content);
}
console.log('Cleaned #fff, #aaa, #bbb from tsx files');
