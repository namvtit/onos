import fs from 'node:fs';

const report = JSON.parse(fs.readFileSync('audit/visual-audit-final/audit-report.json', 'utf8'));

console.log('========================================================================================');
console.log('FORENSIC SECTION COMPARISON REPORT: MANUFACTT (REF) VS LOCAL (ONOS)');
console.log('========================================================================================\n');

for (const vp of ['1440', '375']) {
  console.log(`\n----------------------------------------------------------------------------------------`);
  console.log(`VIEWPORT: ${vp}px`);
  console.log(`----------------------------------------------------------------------------------------`);
  console.log(
    'Section ID'.padEnd(20) +
    'Ref H'.padStart(10) +
    'Loc H'.padStart(10) +
    'Ref Imgs'.padStart(10) +
    'Loc Imgs'.padStart(10) +
    'Broken (L)'.padStart(12) +
    'Overflow (L)'.padStart(14) +
    'ZeroOp (L)'.padStart(12)
  );
  console.log('-'.repeat(98));

  const mSecs = report[vp].manufactt;
  const lSecs = report[vp].local;

  for (const l of lSecs) {
    const m = mSecs.find(s => s.id === l.id);
    const refH = m?.exists ? `${m.height}px` : 'N/A';
    const locH = l.exists ? `${l.height}px` : 'N/A';
    const refImgs = m?.exists ? `${m.totalImages}` : 'N/A';
    const locImgs = l.exists ? `${l.totalImages}` : 'N/A';
    const broken = l.exists ? `${l.brokenImagesCount}` : 'N/A';
    const overflow = l.exists ? (l.hasHorizontalOverflow ? 'YES (OVERFLOW!)' : 'None') : 'N/A';
    const zeroOp = l.exists ? `${l.hiddenChildrenCount}` : 'N/A';

    console.log(
      l.id.padEnd(20) +
      refH.padStart(10) +
      locH.padStart(10) +
      refImgs.padStart(10) +
      locImgs.padStart(10) +
      broken.padStart(12) +
      overflow.padStart(14) +
      zeroOp.padStart(12)
    );
  }

  console.log('\n--- Overflow breakdown ---');
  mSecs.forEach(s => {
    if (s.hasHorizontalOverflow) console.log(`Manufactt ${s.id} overflow: scrollW=${s.scrollWidth}, clientW=${s.clientWidth}, overflowX=${s.overflowX}`);
  });
  lSecs.forEach(s => {
    if (s.hasHorizontalOverflow) console.log(`Local ${s.id} overflow: scrollW=${s.scrollWidth}, clientW=${s.clientWidth}, overflowX=${s.overflowX}`);
  });
}
