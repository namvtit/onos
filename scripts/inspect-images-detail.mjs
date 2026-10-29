import fs from 'node:fs';

const report = JSON.parse(fs.readFileSync('audit/visual-audit-final/audit-report.json', 'utf8'));

for (const vp of ['1440', '375']) {
  console.log(`\n========================================================================================`);
  console.log(`LOCAL IMAGES INSPECTION: ${vp}px`);
  console.log(`========================================================================================`);

  report[vp].local.forEach(s => {
    console.log(`\nSection: ${s.name} (${s.id}) - Total Images: ${s.totalImages}`);
    s.images?.forEach((img, i) => {
      const ar = img.naturalWidth && img.naturalHeight ? (img.naturalWidth / img.naturalHeight).toFixed(2) : 'N/A';
      console.log(`  [${i}] ${img.src} | Natural: ${img.naturalWidth}x${img.naturalHeight} (AR: ${ar}) | Rendered: ${img.renderedWidth}x${img.renderedHeight} | ObjectFit: ${img.objectFit} | Opacity: ${img.opacity}`);
    });
  });
}
